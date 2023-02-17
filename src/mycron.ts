import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SignupService } from './signup/signup.service';
import { WalletService } from './wallets/wallets.service';

@Injectable()
export class MyCronJob {
  private isRunning = false;

  constructor(
    @Inject(SignupService)
    private user: SignupService,
    @Inject(WalletService)
    private userWallet: WalletService,
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
          "0x996051216C33fD54C4602675810FF5B52b3CF8ff",
        );
        const tokenName=await this.userWallet.getTokenNameFromTxHash(newtransaction.hash)
        console.log(newtransaction)
      });
    });
    console.log('Cron job completed');
    this.isRunning = false;
  }
}
