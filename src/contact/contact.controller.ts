import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { SignupService } from 'src/signup/signup.service';
import { ContactDto } from './contact.dto';
// import { SignupService, StoredSignup } from 'src/signup/signup.service';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactservice: ContactService,
    @Inject(ContactService)
    private contactService: ContactService,
    @Inject(SignupService)
    private userModel: SignupService,
  ) {}

  // @Get(':id')
  // async getProfile(@Param('email') email: string): Promise<StoredSignup> {
  //   return this.signupService.findByEmail(email);
  // }

  @Post('add-contact')
  async addContacts(@Body() contacts: ContactDto) {
    const { email, name, address } = contacts;
    const u = await this.userModel.findUserByEmail(email);
    if (u) {
      await this.contactService.addContacts(email, name, address);
    } else {
      return "Email doesn't exist";
    }
    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Get('get-contacts')
  async getContacts(@Query('email') email: string) {
    return this.contactservice.getContacts(email);
  }
  @Get('get-contact-by-address')
  async getContactByAddress(@Query('email') email: string,@Query('contactAddress') contactAddress:string) {
    return this.contactservice.getContactByAddress(email,contactAddress);
  }
  @Post('delete-contact')
  async deleteContact(@Query('email') email:string,@Query('address') address:string ){
    console.log(email,address)
    return this.contactService.deleteContact(email,address);
  }
}
