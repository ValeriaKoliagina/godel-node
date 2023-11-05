import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { KanbanColumnsService } from 'src/kanban_columns/kanban_columns.service';
import { BoardColumnsService } from './board_columns.service';
import { CreateBoardColumnsDto } from './dto/create-board-columns.dto';

@Controller('board-columns')
export class BoardColumnsController {
  constructor(
    private readonly boardColumnsService: BoardColumnsService,
    private readonly kanbanColumnsService: KanbanColumnsService
  ) {}

  @Post()
  async create(@Body() column: CreateBoardColumnsDto) {
    const { kanban_id } = column;
    const kanbanColumn = await this.kanbanColumnsService.findOne(kanban_id);

    if (!kanbanColumn) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    column.name = kanbanColumn.name;
    return this.boardColumnsService.create(column);
  }
}
