import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SignupService } from 'src/signup/signup.service';

// import { SignupService, StoredSignup } from 'src/signup/signup.service';

import { GroupDto } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupservice: GroupService,
    @Inject(GroupService)
    private groupService: GroupService,
    @Inject(SignupService)
    private userModel: SignupService,
  ) {}

  // @Get(':id')
  // async getProfile(@Param('email') email: string): Promise<StoredSignup> {
  //   return this.signupService.findByEmail(email);
  // }

  @Post('add-group')
  async addGroup(@Body() group: GroupDto) {
    const { email, name, contactAddress } = group;
    const u = await this.userModel.findUserByEmail(email);
    if (u) {
      await this.groupService.addGroup(email, name, contactAddress);
    } else {
      return "Email doesn't exist";
    }
    // await createdWallet.save();
    return 'Data stored in array successfully';
  }

  @Get('get-group')
  async getGroup(@Query('email') email: string) {
    return this.groupservice.getGroup(email);
  }
}
