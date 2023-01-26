import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  confirmation: boolean;
  role: string;
  emailVerificationToken: string;
}
