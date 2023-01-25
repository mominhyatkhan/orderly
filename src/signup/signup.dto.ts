export class SignupDto {
  readonly email: string;
  readonly password: string;
  readonly confirmation: boolean;
  readonly role: string;
  readonly emailVerificationToken: string;
}
