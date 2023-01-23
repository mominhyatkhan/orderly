import { Injectable } from '@nestjs/common';
import Moralis from 'moralis/.';

@Injectable()
export class BalanceService {
  getNativeBalance(add: string, chain: string) {
    try {
      const response = Moralis.EvmApi.balance.getNativeBalance({
        address: add,
        chain,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    return 'balance';
  }
}
