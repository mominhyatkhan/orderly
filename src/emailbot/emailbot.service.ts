import { Inject, Injectable } from '@nestjs/common';
import { MonitorService } from 'src/monitor/monitor.service';
import * as sendgrid from '@sendgrid/mail';
import config from 'src/config';
const sendgridKey = config.SENDGRIDAPIKEY;
@Injectable()
export class EmailbotService {
  constructor(
    @Inject(MonitorService)
    private monitorservice: MonitorService,
  ) {}
  async sendEmailNotification(
    to: string,
    newtransaction: any,
    telegram: string,
    chain: string,
    contractAddress: string,
  ) {
    // configure the SendGrid API key
    sendgrid.setApiKey(sendgridKey);
    try {
      // construct the email message
      const message = {
        to: to,
        from: 'ddisdead462@gmail.com',
        subject: `These tokens you have recived ${newtransaction.value} from this contractAddress ${contractAddress} on chain ${chain}`,
        html: `<p>Please click the link below to monitor this address:</p>
                  <p>
                  <a href="http://localhost:8000/monitor/'add-monitor-list?email=${to}&&telegram=${telegram}&&chain=${chain}&&contractAddress=${contractAddress}">http://localhost:8000/verify?token=</a>
                    </p>`,
      };

      // send the email
      await sendgrid.send(message);
    } catch (error) {
      console.log('error in send grid', error);
    }
  }
}
