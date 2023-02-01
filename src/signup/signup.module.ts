import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
// import { AuthService } from 'src/auth/auth.service';
import { SignupController } from './signup.controller';
import { SignupSchema } from './signup.model';
import { SignupService } from './signup.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Signup',
        schema: SignupSchema,
      },
    ]),
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
  ],
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService],
})
export class SignupModule {}
