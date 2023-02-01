import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signup } from '../signup/signup.model';

import { SignupService } from 'src/signup/signup.service';
import { WalletDto } from './wallet.dto';
import { SignupDto } from 'src/signup/signup.dto';

@Injectable()
export class WalletService {
  constructor(
    // @InjectModel('Signup')
    // private signupModel: Model<SignupModel>,

    // @Inject(forwardRef(() => SignupService))
    // @InjectModel('Signup', 'user')
    // private userModel: Model<Signup>,

    @InjectModel('Wallet')
    private walletModel: Model<WalletDto>,
  ) {}

  async createWallet(email: string, address: string, chain: string) {
    // const user: any = await this.userModel.findOne({ email: email });
    // if (!user) {
    //   throw new Error('User with email "${email}" not found');
    // }

    const createdWallet = new this.walletModel({
      address,
      chain,
      email: email,
    });
    await createdWallet.save();
    return createdWallet;
  }

  async fetchWallet(email: string): Promise<WalletDto> {
    const wallet: WalletDto = await this.walletModel
      .findOne({ email: email })
      .exec();
    if (!wallet) {
      return Promise.reject(
        new Error('Invalid Email! No wallets found for this email'),
      );
    } else {
      return Promise.resolve(wallet);
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
