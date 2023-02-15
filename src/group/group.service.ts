import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupDto } from './group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group')
    private groupModel: Model<GroupDto>,
  ) {}
  async addGroup(email: string, name: string, contactAddress: string) {
    const group = new this.groupModel({
      email: email,
      name,
      contactAddress,
    });
    await group.save();
    return group;
  }
  async getGroup(email: string,name:string): Promise<GroupDto> {
    const group: any = await this.groupModel.find({ email: email ,name:name}).exec();
    if (group) return Promise.resolve(group);
    else
      return Promise.reject(new Error('Invalid Email! Or no Group added yet '));
  }
  async deleteMember(email: string,name:string,contactAddress:string): Promise<GroupDto> {
    const group: any = await this.groupModel.deleteOne({ email: email ,name:name,address:contactAddress}).exec();
    console.log(group)
    if (group) return Promise.resolve(group);
    else
      return Promise.reject(new Error('Invalid Email! Or no Group added yet '));
  }
  async deleteMemberFromAllGroups(email: string,address:string): Promise<GroupDto> {
    const group: any = await this.groupModel.deleteOne({ email: email ,contactAddress:address}).exec();
    console.log(group)
    if (group) return Promise.resolve(group);
    else
      return Promise.reject(new Error('Invalid Email! Or no Group added yet '));
  }
}
