import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from 'src/signup/signup.module';
import { GroupController } from './group.controller';
import { GroupSchema } from './group.schema';
import { GroupService } from './group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    SignupModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}