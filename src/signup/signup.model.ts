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

// import mongoose from 'mongoose';

// const SignupSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   emailVerification: { type: String, unique: true },
//   password: { type: String },
//   confirmation: { type: Boolean, default: false },
//   role: { type: String, default: 'user' },
// });

// const Signup = mongoose.model('Signup', SignupSchema);

// -------More Explicit way to create schema
// const SignupSchema = new mongoose.Schema({
//   email: {
//     type: mongoose.Schema.Types.String,
//     unique: true,
//     required: true,
//     lowercase: true,
//     trim: true,
//   },
//   emailVerification: {
//     type: mongoose.Schema.Types.String,
//     unique: true,
//     required: true,
//     lowercase: true,
//     trim: true,
//   },
//   password: {
//     type: mongoose.Schema.Types.String,
//     required: true,
//     select: false,
//   },
//   confirmation: {
//     type: mongoose.Schema.Types.Boolean,
//     default: false,
//   },
//   role: {
//     type: mongoose.Schema.Types.String,
//     default: 'user',
//     lowercase: true,
//     trim: true,
//   },
// });
