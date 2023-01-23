import { Controller, Get, Param, Post } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('native-balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getNativeBalance(@Param() address: string, chain: string) {
    this.balanceService.getNativeBalance(address);
    return 'got balance';
  }
}
