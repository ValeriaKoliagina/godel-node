import { Body, Controller, NotFoundException, Param, Post, Put, Delete } from '@nestjs/common';

import { KanbanColumnsService } from 'src/kanban_columns/kanban_columns.service';
import { BoardColumnsService } from './board_columns.service';
import { CreateBoardColumnsDto } from './dto/create-board-columns.dto';
import { UpdateBoardColumnsDto } from './dto/update-board-columns.dto';

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
      throw new NotFoundException('Kanban column does not exist');
    }

    column.name = kanbanColumn.name;
    return this.boardColumnsService.create(column);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() column: UpdateBoardColumnsDto) {
    return this.boardColumnsService.update(id, column);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const boardColumn = await this.boardColumnsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board column does not exist');
    }
    return this.boardColumnsService.delete(id);
  }
}
