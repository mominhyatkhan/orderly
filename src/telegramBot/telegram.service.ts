import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly Telegram_Bot_API =
    '5768791506:AAEX7AS1vJtJLlwEsCE-KnGv7WCCCs_dCBk';
  private readonly telegramBot = new TelegramBot(
    this.Telegram_Bot_API as string,
    { polling: true },
  );
  constructor() {}

  async sendMessage(message: string, user: string): Promise<any> {
    console.log('im bot', await this.telegramBot.getMe());
    try {
      const response = await this.telegramBot.sendMessage(
        'Nob0dyh3re',
        'buddy'
      );
      console.log('telegram response', response);
      return response;
    } catch (error) {
      console.error('im telegram error', error);
    }
  }
}
