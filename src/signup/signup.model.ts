import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Signup {
  @Prop({ unique: true })
  email: string;
  @Prop({ unique: true })
  emailVerification: string;
  @Prop()
  Password: string;
  @Prop({ default: false })
  confirmation: boolean;
  @Prop({ default: 'user' })
  role: string;
}

export type SignupModel = Signup & Document;
export const SignupSchema = SchemaFactory.createForClass(Signup);
