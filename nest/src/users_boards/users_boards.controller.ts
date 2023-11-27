import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersBoardsService } from './users_boards.service';
import { CreateUsersBoardDto } from './dto/create-user-board.dto';
import { UpdateUsersBoardDto } from './dto/update-user-board.dto';

@Controller('users-boards')
export class UsersBoardsController {
  constructor(private readonly usersBoardsService: UsersBoardsService) {}

  @Post()
  create(@Body() createUsersBoardDto: CreateUsersBoardDto) {
    return this.usersBoardsService.create(createUsersBoardDto);
  }

  @Get()
  findAll() {
    return this.usersBoardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersBoardsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() column: UpdateUsersBoardDto) {
    return this.usersBoardsService.update(id, column);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.usersBoardsService.findOne(id);

    if (!task) {
      throw new NotFoundException('UserBoard does not exist');
    }
    return this.usersBoardsService.delete(id);
  }
}
