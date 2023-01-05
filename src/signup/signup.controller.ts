import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import { SignupService } from './signup.service';

@Controller('signup') //localhost:8000/signup
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signup(@Body() signupDto: SignupDto) {
    this.signupService.signup(signupDto);
    return 'valid';
  }
}
