import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailbotService } from './emailbot/emailbot.service';
import { SignupService } from './signup/signup.service';
import { TelegramService } from './telegramBot/telegram.service';
import { WalletService } from './wallets/wallets.service';

@Injectable()
export class MyCronJob {
  private isRunning = false;

  constructor(
    @Inject(SignupService)
    private user: SignupService,
    @Inject(WalletService)
    private userWallet: WalletService,
    @Inject(TelegramService)
    private telegramBot: TelegramService,
    @Inject(EmailbotService)
    private emailbot: EmailbotService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    if (this.isRunning) {
      console.log('Cron job is already running, skipping...');
      return;
    }
    this.isRunning = true;
    console.log('Cron job started');
    const data = await this.user.getAllData();
    data.map(async (userdata) => {
      //one by one iterating all the users
      let email = userdata.email;
      const walletinfo = await this.userWallet.getWalletsByEmail(email); //get wallets from the database using email of the user
      walletinfo.map(async (wallet) => {
        //one by one get the latest transaction of each walllet by its wallet address
        let newtransaction;
        //check which chain wallet is this one 
        if (wallet.chain == '0x1') {
          if (userdata.isEthereum) {
            newtransaction = await this.userWallet.getLatestTransaction(
              wallet.address,
            );
          }
        }
        console.log(userdata);
        
        let tokenName: any;
        //if latest transaction exist then we get its transfer script for the contract address
        if (newtransaction) {
          tokenName = await this.userWallet.getTokenNameFromTxHash(
            newtransaction.hash,
          );
          let contractAddress: string = '';
          console.log('log address', tokenName);
          tokenName.logs.map((log) => {
            //one by one iterate logs to check if the transfer function is called if it does we get the contract address for the notification
            console.log('log address mine', log);
            if (
              log.topics[0] ==
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
            ) {
              contractAddress = log.address;
            }
          });
          console.log('im contract address', contractAddress);
          //if user turned on the email notification we send the user notification about token along with its address
          if (wallet.isemail) {
            this.emailbot.sendEmailNotification(
              userdata.email,
              newtransaction,
              userdata.telegramName,
              wallet.chain,
              contractAddress,
            );
          }
          //if user turned on the telegram notification we send the user notification about token along with its address
          if (wallet.istelegram) {
            if (contractAddress) {
              this.telegramBot.sendMessage(
                contractAddress,
                newtransaction,
                userdata.telegramName,
                wallet.chain,
                userdata.email,
              );
            }
          }
        }
      });
    });
    console.log('Cron job completed');
    this.isRunning = false;
  }
}
