import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

interface Data {
  address: string;
  chain: string;
}

@Controller('monitor-address')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('transfers')
  async getTxs(@Query() query: Data): Promise<any> {
    return this.transactionsService.getTransactions(query.address, query.chain);
  }

  @Get('native-balance')
  async getNativeBal(@Query() query: Data): Promise<any> {
    return this.transactionsService.getNativeBalance(
      query.address,
      query.chain,
    );
  }

  @Get('get-token-balance')
  async getWalletBal(@Query() query: Data): Promise<any> {
    return this.transactionsService.getWalletTokenBalance(
      query.address,
      query.chain,
    );
  }
}
