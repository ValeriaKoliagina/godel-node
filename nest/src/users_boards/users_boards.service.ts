import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersBoard } from './entities/users_board.entity';
import { Repository } from 'typeorm';
import { CreateUsersBoardDto } from './dto/create-user-board.dto';
import { UpdateUsersBoardDto } from './dto/update-user-board.dto';

@Injectable()
export class UsersBoardsService {
  constructor(
    @InjectRepository(UsersBoard)
    private usersBoardRepository: Repository<UsersBoard>,
  ) {}

  async create(@Body() usersBoard: CreateUsersBoardDto) {
    return this.usersBoardRepository.save(usersBoard);
  }

  findAll() {
    return this.usersBoardRepository.find();
  }

  findOne(id: string) {
    return this.usersBoardRepository.findOne({ 
      where: { id }
    });
  }

  async update(id: string, updateUsersBoardDto: UpdateUsersBoardDto) {
    await this.usersBoardRepository.update(id, updateUsersBoardDto);
    return this.usersBoardRepository.findOneBy({ id });
  }

  async delete(id: string) {
    await this.usersBoardRepository.delete(id);
  }
}
