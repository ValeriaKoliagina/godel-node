import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
  ], 
  controllers: [],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})

export class AuthModule {}
