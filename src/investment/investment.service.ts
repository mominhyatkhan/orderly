import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { investmentDto } from './investment.dto';
import { InvestmentModel } from './investment.model';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel('Investment')
    private investmentModel: Model<InvestmentModel>,
  ) {}

  async addInvestment(data: investmentDto) {
    const investment = new this.investmentModel({
      email: data.email,
      amount: data.amount,
      transactionLink: data.transactionLink,
    });
    try {
      await investment.save();
      console.log(investment);
    } catch (error) {
      console.log(error);
    }
  }
}
