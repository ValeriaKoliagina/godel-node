import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // не нравится такой подход, так как айдишка борда тут и в колумн айди могут быть разными
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() column: UpdateTaskDto) {
    return this.tasksService.update(id, column);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('Task does not exist');
    }
    return this.tasksService.delete(id);
  }
}
