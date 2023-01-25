import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';

// interface Object {
//   address: string;
//   chain: string;
// }

@Injectable()
export class TransactionsService {
  async getTransactions(address: string, chain: string): Promise<any> {
    try {
      const trans = await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
      });

      const result = trans.raw;

      return { result };
    } catch (e) {
      console.log(e);
      console.log('something went wrong');
      throw new Error();
    }
  }
  async getNativeBalance(address: string, chain: string): Promise<any> {
    try {
      const nativeBal = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
      });

      const result = nativeBal.raw;

      return { result };
    } catch (e) {
      console.log(e);
      console.log('something went wrong');
      throw new Error();
    }
  }

  async getWalletTokenBalance(address: string, chain: string): Promise<any> {
    try {
      const tokenBalance = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });
      const result = tokenBalance.raw;

      return { result };
    } catch (e) {
      console.log(e);
      console.log('something went wrong');
      throw new Error();
    }
  }
}
