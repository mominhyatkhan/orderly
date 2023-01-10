import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email/email.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://momin:momin123@openly_db.wozgerr.mongodb.net/?retryWrites=true&w=majority',
    ),
    SignupModule,
    UserModule,
    AuthModule,
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
  ],
  controllers: [AppController, EmailController],
  providers: [AppService],
})
export class AppModule {}
