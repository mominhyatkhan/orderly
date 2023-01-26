import { Injectable } from '@nestjs/common';
import { ItemModel } from './item.model';

@Injectable()
export class ItemService {
  constructor(private itemModel: ItemModel) {}

  async create(createItemDto: any) {
    return await this.itemModel.create(createItemDto);
  }
}
