import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  validate(userName, password) {
    const user: User = this.userService.getUserByName(userName);
    if (user == undefined) {
      throw new UnauthorizedException();
    }
    if (user != undefined && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
