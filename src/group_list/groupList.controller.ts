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
import { GroupListDto } from './groupList.dto';
import { GroupListService } from './groupList.service';
  
  // import { SignupService, StoredSignup } from 'src/signup/signup.service';
  

  
  @Controller('grouplist')
  export class GroupListController {
    constructor(
      private readonly grouplistservice: GroupListService,
      @Inject(GroupListService)
      private groupListService: GroupListService,
      @Inject(SignupService)
      private userModel: SignupService,
    ) {}
  
    // @Get(':id')
    // async getProfile(@Param('email') email: string): Promise<StoredSignup> {
    //   return this.signupService.findByEmail(email);
    // }
  
    @Post('add-group-list')
    async addGroup(@Body() group: GroupListDto) {
      const { email, name} = group;
      console.log(email,name)
      const u = await this.userModel.findUserByEmail(email);
      if (u) {
        await this.groupListService.addGroupList(email, name);
      } else {
        return "Email doesn't exist";
      }
      // await createdWallet.save();
      return 'Data stored in array successfully';
    }
  
    @Get('get-group-list')
    async getGroup(@Query('email') email: string) {
      return this.grouplistservice.getGroupList(email);
    }
  }
  