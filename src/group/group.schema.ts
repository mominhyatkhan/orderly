import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  contactAddress: string;

}

export const GroupSchema = SchemaFactory.createForClass(Group);
