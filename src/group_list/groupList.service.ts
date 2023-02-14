import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupListDto } from './groupList.dto';



@Injectable()
export class GroupListService {
  constructor(
    @InjectModel('GroupList')
    private groupModel: Model<GroupListDto>,
  ) {}
  async addGroupList(email:string,name:string) {
    const group = new this.groupModel({
        name,
        email: email,
      });
      await group.save();
      return group;
  }
  async getGroupList(email: string): Promise<GroupListDto> {
    const group: any = await this.groupModel.find({ email: email } ).exec();
    if (group) return Promise.resolve(group);
    else
      return Promise.reject(
        new Error('Invalid Email! Or no Group added yet '),
      );
  }
}
