import { Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserStatus } from './entities/user.entity';
import { checkIsPasswordCorrect, saltPassword } from './users.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(@Body() user: CreateUserDto | SignUpUserDto) {
    const { password } = user;
    user.password = await saltPassword(password);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ 
      where: { id },
      relations: ['tasks', 'boards']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;

    if (password) {
      updateUserDto.password = await saltPassword(password);
    }

    return this.userRepository.save({ id, ...updateUserDto });
  }

  delete(id: string) {
    return this.userRepository.save({ id, status: UserStatus.INACTIVE });
  }

  async findByLogin(signInUserDto: SignInUserDto) {
    const { password, email } = signInUserDto;

    const user = await this.userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const arePasswordsEqual = await checkIsPasswordCorrect(password, user.password);

    if (!arePasswordsEqual) {
      throw new UnauthorizedException('Password or email is incorrect');
    }

    return user;
  }

  findByPayload({ sub }: JwtPayload) {
    return this.userRepository.findOne({ 
      where: { id: sub } 
    });
  }
}
