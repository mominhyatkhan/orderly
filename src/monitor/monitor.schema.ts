import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class Monitor extends Document {
  @Prop({ required: true })
  telegramId: string;

  @Prop({ required: true})
  chain: string;

  @Prop({ required: true})
  contractAddress: string;
}

export const MonitorSchema = SchemaFactory.createForClass(Monitor);
