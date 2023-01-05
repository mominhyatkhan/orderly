import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // For Authentication
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    return this.authService.generateToken(req.user);
    // return req.user;
  }

  // For Authorization
  @Get('/role1')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('role1'))
  roleData1(@Request() req): string {
    return 'You are allowed to access role 1';
  }

  @Get('/role2')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('role2'))
  roleData2(@Request() req): string {
    return 'You are allowed to access role 2';
  }
}
