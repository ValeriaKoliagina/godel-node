import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Board } from './entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { BoardColumn } from 'src/board_columns/entities/board_column.entity';

@Controller('boards')
@ApiExtraModels(Board)
@ApiTags('Boards')
@ApiBearerAuth()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The board created successfully',
    schema: { $ref: getSchemaPath(Board) }
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createBoardDto: BoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      type: 'array',
      items: {$ref: getSchemaPath(Board) }
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      allOf: [
        { $ref: getSchemaPath(Board) },
        {
          properties: {
            tasks: {
              type: 'array',
              items: { $ref: getSchemaPath(Task) },
            },
          },
        },
        {
          properties: {
            users: {
              type: 'array',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
        {
          properties: {
            board_columns: {
              type: 'array',
              items: { $ref: getSchemaPath(BoardColumn) },
            },
          },
        },
      ],
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No board found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(Board) }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No board found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() column: BoardDto) {
    const boardColumn = await this.boardsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board does not exist');
    }

    return this.boardsService.update(id, column);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'OK'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No board found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    const boardColumn = await this.boardsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board does not exist');
    }

    return this.boardsService.delete(id);
  }
}
