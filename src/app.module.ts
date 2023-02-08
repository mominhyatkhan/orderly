import { Module } from '@nestjs/common';
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
import { WalletsController } from './wallets/wallets.controller';
import { WalletsModule } from './wallets/wallets.module';
import { ConfigModule } from '@nestjs/config';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://momin:momin123@openly_db.wozgerr.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
    SignupModule,
    UserModule,
    AuthModule,
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
    WalletsModule,
    // ItemModule,
    // EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
