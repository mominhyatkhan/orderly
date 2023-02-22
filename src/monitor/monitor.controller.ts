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

  @Post('add-group-list')
  async addGroup(@Body() monitor: MonitorDto) {
    const { telegramId,chain, contractAddress } = monitor;
    console.log(telegramId, contractAddress);

    await this.monitorService.addMonitor(telegramId, contractAddress,chain);

    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Get('get-group-list')
  async getGroup(@Query('email') email: string) {
    return this.monitorService.getMonitorAddress(email);
  }
  @Post('delete-from-group-list')
  async deleteFromGroupList(
    @Query('telegramId') telegramId: string,
    @Query('contractAddress') contractAddress: string,
    @Query('chainId') chain:string
  ) {
    return this.monitorService.deleteFromMonitor(telegramId, contractAddress,chain);
  }
}
