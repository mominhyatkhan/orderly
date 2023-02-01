import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDto } from './wallet.dto';
// import { WalletDto } from './wallets.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet')
    private walletModel: Model<WalletDto>,
  ) {}

  async createWallet(email: string, address: string, chain: string) {
    const createdWallet = new this.walletModel({
      address,
      chain,
      email: email,
    });
    await createdWallet.save();
    return createdWallet;
  }

  async getWalletsByEmail(email: string): Promise<WalletDto> {
    const wallets: any = await this.walletModel.find({ email: email }).exec();
    if (!wallets) {
      return Promise.reject(
        new Error('Invalid Email! No wallets found for this email'),
      );
    } else {
      console.log(wallets);
      return Promise.resolve(wallets);
    }
  }

  // async findUserByEmail(email: string): Promise<any> {
  //   const user: SignupDto = await this.signupModel
  //     .findOne({ email: email })
  //     .exec();
  //   if (!user) {
  //     console.log('Invalid Email! User not found');
  //     return Promise.reject(new Error('Invalid Email! User not found'));
  //   } else {
  //     return Promise.resolve(user);
  //   }
  // }
}
