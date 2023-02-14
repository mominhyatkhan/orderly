import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Res,
  forwardRef,
  Inject,
  BadRequestException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { RoleGuard } from '../role.guard';
import { SignupDto } from './signup.dto';
import * as crypto from 'crypto';
import { SignupService } from './signup.service';

@Controller('user') //localhost:8000/user/signup
export class SignupController {
  constructor(
    //   private readonly signupService: SignupService,
    // private readonly router: Router,
    @Inject(forwardRef(() => SignupService))
    private signupService: SignupService,
    @Inject(forwardRef(() => SignupService))
    private _token,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
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
  async verifyEmail(@Query('token') token: any, @Res() res) {
    const verifiedUser = await this.signupService.verifyEmail(token);
    if (verifiedUser) {
      res.redirect('http://localhost:3000/passwordPage');
      return verifiedUser;
    } else {
      console.log('Token not matched');
      return false;
    }
  }

  @Get('/fetch-verified-user')
  async findUserByEmail(@Query('email') email: string) {
    return await this.signupService.findUserByEmail(email);
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

  @Get('login')
  async loggedIn(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    // const { email, password } = body;
    // if (!email && password) {
    //   throw new BadRequestException('Email and password are required');
    // }
    console.log('hitting login', password);

    const user = await this.signupService.loggedIn(email, password);
    return user;
  }

  @Post('/login2')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    const jwt = this.authService.generateToken(req.user);
    return 'done';
  }

  // For Authorization
  @Get('/user')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
  roleData1(@Request() req): string {
    return 'You are allowed to access USER';
  }

  @Get('/role2')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('role2'))
  roleData2(@Request() req): string {
    return 'You are allowed to access role 2';
  }
}
