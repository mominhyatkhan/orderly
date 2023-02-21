import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import Web3 from 'web3';
import { WalletDto } from './wallet.dto';

// import { WalletDto } from './wallets.dto';

@Injectable()
export class WalletService {
  private readonly ETHERSCAN_API_KEY="93KUMTHQEHAA7D9M1G432YE1S1A6NJYW88"
 
  private readonly web3:Web3
 
  constructor(
    @InjectModel('Wallet')
    private walletModel: Model<WalletDto>,
  ) {
     this.web3 = new Web3(
      'https://mainnet.infura.io/v3/5fa685e205b94088a60d9660290ed940', 
    )
  }

  async createWallet(email: string, address: string, chain: string) {
    const createdWallet = new this.walletModel({
      address,
      chain,
      email: email,
      isemail:false,
      istelegram:false,
    });
    await createdWallet.save();
    return createdWallet;
  }

  async getWalletsByEmail(email: string): Promise<WalletDto[]> {
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
  async setEmailnotification(email:string, setemail:boolean):Promise<WalletDto>{
    const user=await this.walletModel.findOneAndUpdate({email:email},{setemail:setemail})
    return user;
  }
  async getLatestTransaction(
    walletAddress: string,
    duration: number = 60,
  ): Promise<any> {
    const apiKey = this.ETHERSCAN_API_KEY;
    console.log(apiKey);
    
    const endBlock = await this.getBlockNumber();
    const startBlock = endBlock - duration * 4; // Assuming a block is mined every 15 seconds

    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
     response.data
      const latestTransaction = await response.data.result[0];
      return latestTransaction;
    } catch (error) {
      throw new Error(
        `Error fetching latest transaction for ${walletAddress}: ${error.message}`,
      );
    }
  }
  private async getBlockNumber(): Promise<number> {
    const blockNumber = await this.web3.eth.getBlockNumber();
    return blockNumber;
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
  async getTokenNameFromTxHash(txHash:string) {

    try {
      const txReceipt = await this.web3.eth.getTransactionReceipt(txHash);
      for (const log of txReceipt.logs) {
        console.log("log",log);
      }
      return txReceipt;
    } catch (error) {
      console.error(`Error getting token name: ${error}`);
    }
  }
  
}
