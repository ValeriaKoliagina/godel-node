import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() column: UpdateUserDto) {
    return this.usersService.update(id, column);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.usersService.findOne(id);

    if (!task) {
      throw new NotFoundException('User does not exist');
    }
    return this.usersService.delete(id);
  }
}
