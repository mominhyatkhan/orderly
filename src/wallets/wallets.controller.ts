import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { SignupService } from 'src/signup/signup.service';
import {
  createWallet,
  emailNotification,
  telegramNotification,
  WalletDto,
} from './wallet.dto';
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
  async createWallet(@Body() data: createWallet) {
    const { address, chain, email } = data;
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
  async setEmailNotification(@Body() data: emailNotification) {
    const user = await this.walletService.setEmailnotification(
      data.email,
      data.chain,
      data.address,
      data.isemail,
    );
    return user;
  }
  @Post('set-telegram-notification')
  async setTelegramNotification(@Body() data: telegramNotification) {
    const user = await this.walletService.setTelegramnotification(
      data.email,
      data.chain,
      data.address,
      data.istelegram,
    );
    return user;
  }
  @Get('get-wallets')
  async getWalletsByEmail(@Query('email') email: string) {
    return await this.walletService.getWalletsByEmail(email);
  }
}
