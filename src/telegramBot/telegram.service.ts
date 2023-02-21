import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly Telegram_Bot_API =
    '5768791506:AAEX7AS1vJtJLlwEsCE-KnGv7WCCCs_dCBk';
  private telegramBot :TelegramBot
  constructor(
    ) {this.telegramBot = new TelegramBot(
      "5768791506:AAEX7AS1vJtJLlwEsCE-KnGv7WCCCs_dCBk",
      { polling: true }),
      this.telegramBot.on('message', this.handleMessage.bind(this))}

  async sendMessage(message: string, user: string): Promise<any> {
    console.log('im bot', await this.telegramBot.getMe());
    try {
      const userId = '5882906055'; // replace with the user's chat ID
 
      console.log('im message',message);
      
      const response = await this.telegramBot
        .sendMessage(userId, JSON.stringify(message))
        .then(() => {
          console.log('Message sent to user');
        });
      console.log('telegram response', response);
      return response;
    } catch (error) {
      console.error('im telegram error', error);
    }
  }
  async handleMessage(message: TelegramBot.Message): Promise<void> {
    const chatId = message.chat.id;
    const username = message.chat.username;
    const text = message.text;
    console.log(message.text,'im id',message.chat.id,'im username', message.chat.username)
    if (text === '/start') {
      await this.telegramBot.sendMessage(chatId, `Hello, ${username}! Welcome to my bot!`);
    }
  }
  
}
