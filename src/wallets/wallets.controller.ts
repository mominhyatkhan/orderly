import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { SignupService } from 'src/signup/signup.service';
import { WalletDto } from './wallet.dto';
import { WalletService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(
    @Inject(WalletService)
    private walletService: WalletService,

    @Inject(SignupService)
    private userModel: SignupService,
  ) {}

  @Post('add-wallet')
  async createWallet(@Body() data: WalletDto) {
    const { email, address, chain } = data;
    const u = await this.userModel.findUserByEmail(email);
    if (u) {
      await this.walletService.createWallet(email, address, chain);
    } else {
      return "Email doesn't exist";
    }
    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Post('set-email-notification')
  async setEmailNotification(@Query('email') email:string,@Query('isEmail') isEmail:boolean){
    const user=await this.walletService.setEmailnotification(email,isEmail);
  }
  @Post('set-telegram-notification')
  async setTelegramNotification(@Query('email') email:string,@Query('isTelegram') isTelegram:boolean){
    const user=await this.walletService.setTelegramnotification(email,isTelegram);
  }
  @Get('get-wallets')
  async getWalletsByEmail(@Query('email') email: string) {
    return await this.walletService.getWalletsByEmail(email);
  }
}
