import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';

export const createToken = async (jwtService: JwtService, user: User) => {
  const payload = { sub: user.id, name: user.name };
  const accessToken = await jwtService.signAsync(payload);

  return {
    expiresIn: process.env.EXPIRES_IN,
    accessToken,
  };
}
