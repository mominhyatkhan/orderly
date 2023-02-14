import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  emailVerified: boolean;
  role: string;
  emailVerification: string;
}
