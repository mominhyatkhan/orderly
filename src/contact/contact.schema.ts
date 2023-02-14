import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class Contact extends Document {
  @Prop({ unique:true, required: true })
  name: string;

  @Prop({ unique:true, required: true })
  address: string;

  @Prop({ required: true })
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
