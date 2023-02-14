import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from '../schema/item.schema';

@Injectable()
export class ItemModel {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  async create(createItemDto: Item) {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }
}
