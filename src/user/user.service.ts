import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      email: 'momin123456@gmail.com',
      password: '123',
      role: 'role1',
    },
    {
      email: 'apple123456@gmail.com',
      password: '1234',
      role: 'role2',
    },
  ];
  getUserByName(email: string): User {
    return this.users.find((user: User) => user.email === email);
  }
}
