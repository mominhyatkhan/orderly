import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from 'src/signup/signup.module';
import { ContactController } from './contact.controller'; 
import { ContactSchema } from './contact.schema';
import { ContactService } from './contact.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    SignupModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}