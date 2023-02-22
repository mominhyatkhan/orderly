import { Inject, Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { MonitorService } from 'src/monitor/monitor.service';

@Injectable()
export class TelegramService {
  private readonly Telegram_Bot_API =
    '5768791506:AAEX7AS1vJtJLlwEsCE-KnGv7WCCCs_dCBk';
  private telegramBot: TelegramBot;
  private messageArray:any[]
  constructor(
    @Inject(MonitorService)
    private monitorservice: MonitorService,
  ) {
    (this.telegramBot = new TelegramBot(
      '5768791506:AAEX7AS1vJtJLlwEsCE-KnGv7WCCCs_dCBk',
      { polling: true },
    )),
      // constructor to handle the buttons accept and reject
      // if user accept the token we will store the address and the related chain

      this.telegramBot.on('message', this.handleMessage.bind(this));
    this.telegramBot.on('callback_query', (query) => {
      const response = JSON.parse(query.data);
      const id = query.message.chat.id;
      const messageId = query.message.message_id;
      
      if (response != 'rejected') {
        monitorservice.addMonitor(
          query.from.id,
          response.messageId,
          response.chain,
        );
        console.log('im contract', query.from.id);
        this.telegramBot.editMessageText('Thank you for Your Response', {
          chat_id: id,
          message_id: messageId,
          parse_mode: 'Markdown',
        });
        console.log(query);
      }
    });
  }
  async sendMessage(
    contractAddress: string,
    message: any,
    user: string,
    chaindata: string,
  ): Promise<any> {
    console.log('im bot', await this.telegramBot.getMe());
    try {
      const userId = '5837866743'; // replace with the user's chat ID

      console.log('im message', message);
      if (contractAddress) {
        this.messageArray.push({contractAddress:contractAddress,chainId:chaindata,messageid:message.timeStamp})
        await this.telegramBot
          .sendMessage(userId, message.hash, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Accept',
                    callback_data: JSON.stringify({
                      messageId:message.timeStamp,
                      chain: chaindata,
                    }),
                  },
                ],
                [
                  {
                    text: 'Reject',
                    callback_data: 'rejected',
                  },
                ],
              ],
            },
          })
          .then(() => {
            console.log('Message sent to user');
          });
      }
    } catch (error) {
      console.error('im telegram error', error);
    }
  }
  async handleMessage(message: TelegramBot.Message): Promise<void> {
    const chatId = message.chat.id;
    const username = message.chat.username;
    const text = message.text;
    console.log(
      message.text,
      'im id',
      message.chat.id,
      'im username',
      message.chat.username,
    );
    console.log(this.telegramBot);
    if (text === '/start') {
      await this.telegramBot.sendMessage(
        chatId,
        `Hello, ${username}! Welcome to my bot!`,
      );
    }
  }
}
