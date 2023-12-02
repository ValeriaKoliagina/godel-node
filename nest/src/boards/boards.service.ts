import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {BoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: BoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: string) {
    return this.boardRepository.findOne({ 
      where: { id },
      relations: ['board_columns', 'tasks', 'users'],
    });
  }

  update(id: string, updateBoardColumnsDto: BoardDto) {
    return this.boardRepository.save({ id, ...updateBoardColumnsDto });
  }

  async delete(id: string) {
    await this.boardRepository.delete(id);
  }
}
