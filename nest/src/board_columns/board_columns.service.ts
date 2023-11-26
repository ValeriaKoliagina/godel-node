import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardColumn } from './entities/board_column.entity';
import { CreateBoardColumnsDto } from './dto/create-board-columns.dto';
import { UpdateBoardColumnsDto } from './dto/update-board-columns.dto';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private boardColumnRepository: Repository<BoardColumn>,
  ) {}

  create(createBoardColumnsDto: CreateBoardColumnsDto) {
    return this.boardColumnRepository.save(createBoardColumnsDto);
  }

  async update(id: string, updateBoardColumnsDto: UpdateBoardColumnsDto) {
    await this.boardColumnRepository.update(id, updateBoardColumnsDto);
    return this.boardColumnRepository.findOneBy({ id });
  }
}
