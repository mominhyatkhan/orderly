import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SignupDto } from './signup.dto';

// interface User {
//   // username: string;
//   email: string;
//   password: string;
// }

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('Signup')
    private signupModel: Model<SignupModel>,
  ) {}
  async signup(user: SignupDto) {
    const newUser = new this.signupModel({
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      emailVerification: crypto.randomBytes(20).toString('hex'),
    });
    try {
      await newUser.save();
    } catch (err) {
      console.log(err);
    }
  }
}
