import { Body, Controller, Get, Post } from "@nestjs/common";
import { investmentDto } from "./investment.dto";
import { InvestmentService } from "./investment.service";
@Controller('investment')
export class InvestmentController{
    constructor (private readonly investmentservice:InvestmentService) {}
    @Post('addInvestment')async addInvestmentwithEmail(@Body() data: investmentDto){
        await this.investmentservice.addInvestment(data)
    }
}

