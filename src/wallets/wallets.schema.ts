import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class Wallet extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  chain: string;

  @Prop({ required: true })
  istelegram: boolean;

  @Prop({ required: true })
  isemail: boolean;

  @Prop({ required: true })
  email: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

// const WalletModel = model('Wallet', WalletSchema);

// WalletSchema.pre('save', async function (next) {
//   // const wallet = this;
//   const existingWallet = await WalletModel.findOne({
//     address: this.address,
//     chain: this.chain,
//   });

//   if (existingWallet) {
//     throw new BadRequestException(
//       'Address and chain combination already exists',
//     );
//   }

//   next();
// });
