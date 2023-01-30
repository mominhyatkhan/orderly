import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SignupDto } from './signup.dto';
import * as sendgrid from '@sendgrid/mail';
import { Router } from 'express';

export interface StoredSignup {
  email: string;
  password: any;
  emailVerification: string;
  emailVerified: boolean;
  role: string;
  // other properties that are stored in the database
}
@Injectable()
export class SignupService {
  router: any;
  constructor(
    @InjectModel('Signup')
    private signupModel: Model<SignupModel>,
  ) {}
  private secret;
  async signup(user: SignupDto, token: any) {
    const newUser = new this.signupModel({
      email: user.email,
      password: null,
      emailVerification: token,
      emailVerified: false,
    });
    try {
      await newUser.save();
      console.log('DATA IS SAVED IN DB SUCCESSFULLY');
      return newUser;
    } catch (err) {
      console.log('error from service: ', err);
    }
  }

  async sendVerificationEmail(to: string, token: any) {
    // configure the SendGrid API key
    // mohib's sendgrid key: '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'
    sendgrid.setApiKey(
      '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',
    );
    try {
      // construct the email message
      const message = {
        to: to,
        from: 'ddisdead462@gmail.com',
        subject: 'Verify your email address',
        html: `<p>Please click the link below to verify your email address:</p>
                  <p>
                  <p> abb final hai 3 </p>
                  <a href="http://localhost:8000/signup/verify?token=${token}">http://localhost:8000/verify?token=${token}</a>
                    </p>`,
      };
      this.secret = token;

      // send the email
      await sendgrid.send(message);
    } catch (error) {
      console.log('error in send grid', error);
    }
  }

  async verifyEmail(token: any) {
    const _user = await this.findUserByEmailToken(token);

    console.log('secret key: ', this.secret);
    console.log('------------------');
    console.log('token', token);
    console.log('------------------');

    // compare the hash to the token
    if (this.secret === token) {
      console.log('Email verified!');
      _user.emailVerified = true;
      await _user.save();
      console.log('NEW USER', _user);
      return 'Value updated in DB. GO BACK TO THE WEBSITE AND SET YOUR PASSWORD';
    } else {
      console.log('Invalid token! Cannot Verified');
      return false;
    }
  }

  async setPassword(pass: string, token: any) {
    const _user: SignupModel = await this.findUserByEmailToken(token);

    console.log('Email verified!');
    _user.password = await bcrypt.hash(pass, 10);
    await _user.save();
    console.log('after password user', _user);

    return true;
  }

  async findUserByEmailToken(token: any): Promise<SignupModel> {
    const user: SignupModel = await this.signupModel
      .findOne({ emailVerification: token })
      .exec();
    if (!user) {
      console.log('Invalid token! User not found');
      return Promise.reject(new Error('Invalid token! User not found'));
    } else {
      return Promise.resolve(user);
    }
  }
  // async findByEmail(email: string): Promise<StoredSignup> {
  //   return await this.signupModel.findOne({ email }).exec();
  // }
}
