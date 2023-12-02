import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Task } from './entities/task.entity';
import { UsersService } from 'src/users/users.service';
import { BoardColumnsService } from 'src/board_columns/board_columns.service';
import { BoardsService } from 'src/boards/boards.service';

@Controller('tasks')
@ApiExtraModels(Task)
@ApiTags('Tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
    private readonly boardColumnsService: BoardColumnsService,
    private readonly boardsService: BoardsService
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The task created successfully',
    schema: { $ref: getSchemaPath(Task) }
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No connected info found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const { board_id, board_column_id, assignee_id } = createTaskDto;
    const user = await this.usersService.findOne(assignee_id);
    const board = await this.boardsService.findOne(board_id);
    const boardColumn = await this.boardColumnsService.findOne(board_column_id);
    const errors = [];

    if (!user) {
      errors.push('User does not exist');
    }

    if (!board) {
      errors.push('Board does not exist');
    }

    if (!boardColumn) {
      errors.push('Board column does not exist');
    }

    if (errors.length) {
      throw new NotFoundException(errors);
    }

    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      type: 'array',
      items: { $ref: getSchemaPath(Task) },
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(Task) }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No task found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(Task) }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No task found'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() column: UpdateTaskDto) {
    const { board_id, board_column_id, assignee_id } = column;
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('Task does not exist');
    }

    const user = await this.usersService.findOne(assignee_id);
    const board = await this.boardsService.findOne(board_id);
    const boardColumn = await this.boardColumnsService.findOne(board_column_id);
    const errors = [];

    if (!user) {
      errors.push('User does not exist');
    }

    if (!board) {
      errors.push('Board does not exist');
    }

    if (!boardColumn) {
      errors.push('Board column does not exist');
    }

    if (errors.length) {
      throw new NotFoundException(errors);
    }

    return this.tasksService.update(id, column);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'OK'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No task found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('Task does not exist');
    }

    return this.tasksService.delete(id);
  }
}
