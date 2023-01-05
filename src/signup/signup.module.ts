import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupController } from './signup.controller';
import { SignupSchema } from './signup.model';
import { SignupService } from './signup.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Signup',
        schema: SignupSchema,
      },
    ]),
  ],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
