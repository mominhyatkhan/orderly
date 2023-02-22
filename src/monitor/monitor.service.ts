import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitorDto } from './monitor.dto';

@Injectable()
export class MonitorService {
  constructor(
    @InjectModel('Monitor')
    private monitorModel: Model<MonitorDto>,
  ) {}
  async addMonitor(telegramId: string, contractAddress: string, chain: string) {
    const monitor = new this.monitorModel({
      telegramId: telegramId,
      chain: chain,
      contractAddress: contractAddress,
    });
    await monitor.save();
    return monitor;
  }
  async getMonitorAddress(telegramId: string): Promise<MonitorDto> {
    const monitor: any = await this.monitorModel
      .find({ telegramId: telegramId })
      .exec();
    if (monitor) return Promise.resolve(monitor);
    else
      return Promise.reject(new Error('Invalid Email! Or no Group added yet '));
  }
  async deleteFromMonitor(
    telegramId: string,
    contractAddress: string,
    chain: string,
  ): Promise<MonitorDto> {
    const monitor: any = await this.monitorModel
      .deleteOne({
        telegramId: telegramId,
        chain: chain,
        contractAddress: contractAddress,
      })
      .exec();
    if (monitor) return Promise.resolve(monitor);
    else
      return Promise.reject(new Error('Invalid Email! Or no Group added yet '));
  }
}
