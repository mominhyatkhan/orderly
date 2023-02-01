import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
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
    }
    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Get('fetch-wallets')
  async fetchWallet(@Query('email') email: string) {
    return await this.walletService.fetchWallet(email);
  }
}
