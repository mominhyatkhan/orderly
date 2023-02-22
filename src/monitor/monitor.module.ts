import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from 'src/signup/signup.module';
import { MonitorController } from './monitor.controller';
import { MonitorSchema } from './monitor.schema';
import { MonitorService } from './monitor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Monitor', schema: MonitorSchema }]),
    SignupModule,
  ],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [MonitorService],
})
export class MonitorModule {}
