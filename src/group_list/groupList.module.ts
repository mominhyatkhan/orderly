import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from 'src/signup/signup.module';
import { GroupListController } from './groupList.controller';
import { GroupListSchema } from './groupList.schema';
import { GroupListService } from './groupList.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'GroupList', schema: GroupListSchema }]),
    SignupModule,
  ],
  controllers: [GroupListController],
  providers: [GroupListService],
})
export class GroupListModule {}
