import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: string) {
    return this.boardRepository.findOneBy({ id });
  }
}
