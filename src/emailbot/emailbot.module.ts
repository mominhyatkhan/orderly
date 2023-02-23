import { Module } from "@nestjs/common";
import { MonitorModule } from "src/monitor/monitor.module";
import { EmailbotService } from "./emailbot.service";


@Module({
  imports: [
    MonitorModule,
  ],
  controllers: [],
  providers: [EmailbotService],
  exports: [EmailbotService],
})
export class EmailbotModule {}