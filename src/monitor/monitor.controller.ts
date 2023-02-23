import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MonitorDto } from './monitor.dto';
import { MonitorService } from './monitor.service';

// import { SignupService, StoredSignup } from 'src/signup/signup.service';

@Controller('monitor')
export class MonitorController {
  constructor(
    private readonly grouplistservice: MonitorService,
    @Inject(MonitorService)
    private monitorService: MonitorService,
  ) {}

  // @Get(':id')
  // async getProfile(@Param('email') email: string): Promise<StoredSignup> {
  //   return this.signupService.findByEmail(email);
  // }

  @Post('add-monitor-list')
  async addMonitor(
    @Query('email') email: string,
    @Query('telegram') telegramId: string,
    @Query('chain') chain: string,
    @Query('contractAddress') contractAddress: string,
  ) {
    console.log(telegramId, contractAddress);

    await this.monitorService.addMonitor(
      telegramId,
      contractAddress,
      chain,
      email,
    );

    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Get('get-monitor-list')
  async getGroup(@Query('email') email: string) {
    return this.monitorService.getMonitorAddress(email);
  }
  @Post('delete-from-group-list')
  async deleteFromGroupList(@Body() data: MonitorDto) {
    return this.monitorService.deleteFromMonitor(
      data.email,
      data.telegramId,
      data.contractAddress,
      data.chain,
    );
  }
}
