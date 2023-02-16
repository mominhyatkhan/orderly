import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SignupService } from './signup/signup.service';

@Injectable()
export class MyCronJob {
  private isRunning = false;

  constructor(
    @Inject(SignupService)
    private user: SignupService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    if (this.isRunning) {
      console.log('Cron job is already running, skipping...');
      return;
    }
    this.isRunning = true;
    console.log('Cron job started');
    const data = await this.user.getAllData();
    console.log(data);
    console.log('Cron job completed');
    this.isRunning = false;
  }
}