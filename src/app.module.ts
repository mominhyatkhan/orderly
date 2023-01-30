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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://momin:momin123@openly_db.wozgerr.mongodb.net/?retryWrites=true&w=majority',
    ),
    SignupModule,
    UserModule,
    AuthModule,
    TransactionsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
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
  providers: [AppService],
})
export class AppModule {}
