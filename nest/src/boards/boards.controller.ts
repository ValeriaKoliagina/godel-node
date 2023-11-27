import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: BoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() column: BoardDto) {
    return this.boardsService.update(id, column);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const boardColumn = await this.boardsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board does not exist');
    }
    return this.boardsService.delete(id);
  }
}
