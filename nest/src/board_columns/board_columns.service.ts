import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardColumn } from './entities/board_column.entity';
import { CreateBoardColumnsDto } from './dto/create-board-columns.dto';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private boardRepository: Repository<BoardColumn>,
  ) {}

  create(createBoardColumnsDto: CreateBoardColumnsDto) {
    return this.boardRepository.save(createBoardColumnsDto);
  }
}
