import { Module } from "@nestjs/common";
import { MonitorModule } from "src/monitor/monitor.module";

import { TelegramService } from "./telegram.service";
@Module({
  imports: [
    MonitorModule,
  ],
  controllers: [],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}