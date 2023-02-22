import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TransactionsModule } from './transactions/transactions.module';
import { ItemModule } from './item/item.module';
// import { EmailModule } from './email/email.module';
import { WalletsModule } from './wallets/wallets.module';
import { ConfigModule } from '@nestjs/config';
import { InvestmentModule } from './investment/investment.module';
import { ContactModule } from './contact/contact.module';
import { GroupModule } from './group/group.module';
import { GroupListModule } from './group_list/groupList.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MyCronJob } from './mycron';
import { TelegramModule } from './telegramBot/telegram.module';
import { MonitorModule } from './monitor/monitor.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://momin:momin123@openly_db.wozgerr.mongodb.net/test',
    ),

    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
    ScheduleModule.forRoot(),
    SignupModule,
    WalletsModule,
    UserModule,
    ContactModule,
    AuthModule,
    GroupModule,
    TelegramModule,
    GroupListModule,
    MonitorModule,
    TransactionsModule,
    InvestmentModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRIDAPIKEY,
        },
      },
      template: {
        dir: join(__dirname, 'mail_template'),
        adapter: new HandlebarsAdapter(),
      },
    }),

    // ItemModule,
    // EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyCronJob],
})
export class AppModule {}
