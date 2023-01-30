import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Res,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { SignupDto } from './signup.dto';
import * as crypto from 'crypto';
import { SignupService } from './signup.service';

@Controller('signup') //localhost:8000/signup
export class SignupController {
  constructor(
    //   private readonly signupService: SignupService,
    // private readonly router: Router,
    @Inject(forwardRef(() => SignupService))
    private signupService: SignupService,
    @Inject(forwardRef(() => SignupService))
    private _token,
  ) {}

  @Post()
  async signup(@Body() signupDto: SignupDto) {
    const hmac = crypto.createHmac('sha256', 'orderly');
    const token = hmac.update(signupDto.email).digest('hex');
    const user = await this.signupService.signup(signupDto, token);
    console.log('this is your DBs user: ', user);
    this._token = token;
    console.log('token in controller', token);
    await this.signupService.sendVerificationEmail(user.email, token);

    return `Succesfully sent mail. Please check your ${user.email} to verify`;
  }

  @Get('/verify')
  async verifyEmail(@Query('token') token: any) {
    return await this.signupService.verifyEmail(token);
  }

  @Post('/set-password')
  async setPassword(
    // @Body('token') token: any,
    @Body('password') password: string,
  ) {
    if (this._token) {
      return await this.signupService.setPassword(password, this._token);
    } else {
      console.log('CANNOT ACCESS THIS LINK WITHOUT SIGNING UP');
    }
  }
}
