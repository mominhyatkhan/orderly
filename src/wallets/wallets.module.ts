// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { WalletsController } from './wallets.controller';
// import { WalletService } from './wallets.service';
// import { Wallet, WalletSchema } from './wallets.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
//   ],
//   controllers: [WalletsController],
//   providers: [WalletService],
// })
// export class WalletsModule {}

// WalletsModule.ts

import { Module } from '@nestjs/common';
import { SignupModule } from '../signup/signup.module';
import { WalletsController } from './wallets.controller';
import { WalletService } from './wallets.service';
import { WalletSchema } from './wallets.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupService } from '../signup/signup.service';
import { SignupSchema } from '../signup/signup.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    SignupModule,
  ],
  controllers: [WalletsController],
  providers: [WalletService],
})
export class WalletsModule {}
