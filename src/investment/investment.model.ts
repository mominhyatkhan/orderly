import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Investment {
  @Prop({ unique: true })
  email: string;
  @Prop({ default: null })
  amount: number;
  @Prop({ default: null })
  transactionLink: string;
}

export type InvestmentModel = Investment & Document;
export const InvestmentSchema = SchemaFactory.createForClass(Investment);