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
          '0xa5d7bba71cc0f388b973a25e9b50a44d47ba226f',
        );
        console.log(newtransaction, wallet.address);
        let tokenName: any;
        if (newtransaction) {
          tokenName = await this.userWallet.getTokenNameFromTxHash(
            newtransaction.hash,
          );
          await this.telegramBot.sendMessage(
            newtransaction,
            userdata.telegramName,
            wallet.chain
          );
          console.log('ill send notification to the user');
          console.log('hehe', tokenName);

          if (wallet.isemail) {
            console.log('i will send notification to email');
          }

          if (wallet.istelegram) {
          }
        }
      });
    });
    console.log('Cron job completed');
    this.isRunning = false;
  }
}
