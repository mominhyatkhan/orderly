import { Controller, Post, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '../schema/item.schema';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: Item) {
    return await this.itemService.create(createItemDto);
  }
}
