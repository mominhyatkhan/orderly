import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact')
    private contactModel: Model<ContactDto>,
  ) {}
  async addContacts(email:string,name:string,address:string) {
    const contact = new this.contactModel({
        name,
        address,
        email: email,
      });
      await contact.save();
      return contact;
  }
  async getContacts(email: string): Promise<ContactDto> {
    const contacts: any = await this.contactModel.find({ email: email }).exec();
    if (contacts) return Promise.resolve(contacts);
    else
      return Promise.reject(
        new Error('Invalid Email! No Contacts found for this email'),
      );
  }
  async getContactByAddress(email: string,contactAddress:string): Promise<ContactDto> {
    const contact: any = await this.contactModel.find({ email: email,address:contactAddress }).exec();
    if (contact) return Promise.resolve(contact);
    else
      return Promise.reject(
        new Error('Invalid Email! No Contacts found for this email'),
      );
  }
  async deleteContact(email:string,contactaddress:string) {
   const response:any= await this.contactModel.deleteOne({address:contactaddress,email:email}).exec();
   console.log(response)
  }
}

