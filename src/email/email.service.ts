import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private secret;
  //   crypto.randomBytes(32).toString('hex'); // replace with your own secret key

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
                  <a href="http://localhost:8000/verify?token=${token}">http://localhost:8000/verify?token=${token}</a>
                    </p>`,
      };

      //   console.log('message', message);
      console.log('typeof message', typeof message);
      console.log('token 256 hashed :', token);
      this.secret = token;

      // send the email
      await sendgrid.send(message);
    } catch (error) {
      console.log('error in send grid', error);
    }
  }

  async verifyEmail(token: any) {
    // create a hash of the token and the secret key

    console.log('secret key: ', this.secret);
    console.log('------------------');
    console.log('token', token);
    console.log('------------------');

    // compare the hash to the token
    if (this.secret === token) {
      console.log('Email verified!');
      return true;
    } else {
      console.log('Invalid token!');
      return false;
    }
  }
}
