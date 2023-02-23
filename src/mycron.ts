import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
      let email = userdata.email;
      const walletinfo = await this.userWallet.getWalletsByEmail(email);
      walletinfo.map(async (wallet) => {
        const newtransaction = await this.userWallet.getLatestTransaction(
          wallet.address,
        );
        console.log(newtransaction);

        let tokenName: any;
        if (newtransaction) {
          tokenName = await this.userWallet.getTokenNameFromTxHash(
            newtransaction.hash,
          );
          let contractAddress: string = '';
          console.log('log address', tokenName);
          tokenName.logs.map((log) => {
            console.log('log address mine', log);
            if (
              log.topics[0] ==
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
            ) {
              contractAddress = log.address;
            }
          });
          console.log('im contract address', contractAddress);
          if (wallet.isemail) {
            console.log('i will send notification to email');
          }

          if (wallet.istelegram) {
            await this.telegramBot.sendMessage(
              contractAddress,
              newtransaction,
              userdata.telegramName,
              wallet.chain,
            );
          }
        }
      });
    });
    console.log('Cron job completed');
    this.isRunning = false;
  }
}
