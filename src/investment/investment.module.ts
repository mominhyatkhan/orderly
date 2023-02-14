import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { InvestmentController } from './investment.controller';
import { InvestmentSchema } from './investment.model';
import { InvestmentService } from './investment.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Investment',
        schema: InvestmentSchema,
      },
    ]),
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
  ],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}