import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class GroupList extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const GroupListSchema = SchemaFactory.createForClass(GroupList);