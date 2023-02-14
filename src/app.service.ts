import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(): string {
    return 'hit the login';
  }
}
