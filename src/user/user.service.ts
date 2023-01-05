import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'Momin',
      email: 'momin123456@gmail.com',
      password: '123',
      role: 'role1',
    },
    {
      username: 'Apple',
      email: 'apple123456@gmail.com',
      password: '1234',
      role: 'role2',
    },
  ];
  getUserByName(userName: string): User {
    return this.users.find((user: User) => user.username === userName);
  }
}
