import { Controller, Get, Query } from '@nestjs/common';
import * as crypto from 'crypto';
import { EmailService } from './email.service';

@Controller('verify')
export class EmailController {
  constructor(private readonly emailVerificationService: EmailService) {}

  @Get('/email')
  async sendVerificationEmail(@Query('email') email: string) {
    const hmac = crypto.createHmac('sha256', 'orderly');
    const token = hmac.update(email).digest('hex');
    console.log('token in controller', token);

    await this.emailVerificationService.sendVerificationEmail(email, token);
  }

  @Get('/')
  async verifyEmail(@Query('token') token: any) {
    return await this.emailVerificationService.verifyEmail(token);
  }
}

// import { MailerService } from '@nestjs-modules/mailer';
// import { Body, Controller, Get, Post, Query } from '@nestjs/common';

// @Controller('email')
// export class EmailController {
//   constructor(private mailService: MailerService) {}

//   @Get('email-verification')
//   async plainTextEmail(@Query('toemail') toemail: string) {
//     await this.mailService.sendMail({
//       to: toemail,
//       from: 'mominhyatkhansm@gmail.com',
//       subject: 'Welcome',
//       text: 'Congratulations! You are not selected again. xD',
//     });
//     return 'success';
//   }

//   @Post('email-verification-html')
//   async postHtmlEmail(@Body() payload) {
//     await this.mailService.sendMail({
//       to: payload.toemail,
//       from: 'mominhyatkhansm@gmail.com',
//       subject: 'Welcome',
//       template: 'verification',
//       context: {
//         verification: payload,
//       },
//     });
//     return 'success';
//   }
// }
