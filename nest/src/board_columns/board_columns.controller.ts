import { Body, Controller, NotFoundException, Param, Post, Put, Delete, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { KanbanColumnsService } from 'src/kanban_columns/kanban_columns.service';
import { BoardColumnsService } from './board_columns.service';
import { CreateBoardColumnsDto } from './dto/create-board-columns.dto';
import { UpdateBoardColumnsDto } from './dto/update-board-columns.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRole } from 'src/roles/roles.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { BoardColumn } from './entities/board_column.entity';
import { BoardsService } from 'src/boards/boards.service';

@Controller('board-columns')
@ApiExtraModels(BoardColumn)
@ApiTags('Board-columns')
@ApiBearerAuth()
export class BoardColumnsController {
  constructor(
    private readonly boardColumnsService: BoardColumnsService,
    private readonly kanbanColumnsService: KanbanColumnsService,
    private readonly boardsService: BoardsService
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The board column created successfully',
    schema: { $ref: getSchemaPath(BoardColumn) },
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No info found'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() column: CreateBoardColumnsDto) {
    const { kanban_id, board_id } = column;
    const kanbanColumn = await this.kanbanColumnsService.findOne(kanban_id);
    const board = await this.boardsService.findOne(board_id);
    const errors = [];

    if (!kanbanColumn) {
      errors.push('Kanban column does not exist');
    }

    if (!board) {
      errors.push('Board does not exist');
    }

    if (errors.length) {
      throw new NotFoundException(errors);
    }

    column.name = kanbanColumn.name;
    return this.boardColumnsService.create(column);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(BoardColumn) },
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No board column found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() column: UpdateBoardColumnsDto) {
    const { board_id } = column;
    const boardColumn = await this.boardColumnsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board column does not exist');
    }

    const board = await this.boardsService.findOne(board_id);

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    return this.boardColumnsService.update(id, column);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'OK'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No board column found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    const boardColumn = await this.boardColumnsService.findOne(id);

    if (!boardColumn) {
      throw new NotFoundException('Board column does not exist');
    }

    return this.boardColumnsService.delete(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      type: 'array',
      items: { $ref: getSchemaPath(BoardColumn) }
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findAll() {
    return this.boardColumnsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(BoardColumn) },
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No board column found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.boardColumnsService.findOne(id);
  }
}
