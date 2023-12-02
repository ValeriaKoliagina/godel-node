import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { createToken } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findByPayload(payload);

    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }

    return user;
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findByLogin(signInUserDto);
    const token = await createToken(this.jwtService, user);

    return {
      name: user.name,
      ...token,
    }; 
  }
}
