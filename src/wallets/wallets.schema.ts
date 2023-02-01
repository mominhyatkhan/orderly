// import { Schema, Types, model } from 'mongoose';

// export const UserSchema = new Schema({
//   name: String,
// });

// export const WalletSchema = new Schema({
//   address: String,
//   chain: String,
//   user: {
//     type: Types.ObjectId,
//     ref: 'User',
//   },
// });

// export const User = model('User', UserSchema);
// export const Wallet = model('Wallet', WalletSchema);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet {
  @Prop({ unique: true })
  address: string;

  @Prop({ required: true })
  chain: string;

  @Prop({ ref: 'Signup', unique: true })
  email: string;
}

export type WalletModel = Wallet & Document;
export const WalletSchema = SchemaFactory.createForClass(Wallet);
