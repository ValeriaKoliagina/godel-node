import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersBoardsService } from './users_boards.service';
import { CreateUsersBoardDto } from './dto/create-user-board.dto';
import { UpdateUsersBoardDto } from './dto/update-user-board.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { UsersBoard } from './entities/users_board.entity';
import { UsersService } from 'src/users/users.service';
import { BoardsService } from 'src/boards/boards.service';

@Controller('users-boards')
@ApiExtraModels(UsersBoard)
@ApiTags('Users-boards')
@ApiBearerAuth()
export class UsersBoardsController {
  constructor(
    private readonly usersBoardsService: UsersBoardsService,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The users board created successfully',
    schema: { $ref: getSchemaPath(UsersBoard) }
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No info found'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createUsersBoardDto: CreateUsersBoardDto) {
    const { board_id, user_id } = createUsersBoardDto;
    const user = await this.usersService.findOne(user_id);
    const board = await this.boardsService.findOne(board_id);
    const errors = [];

    if (!user) {
      errors.push('User does not exist');
    }

    if (!board) {
      errors.push('Board does not exist');
    }

    if (errors.length) {
      throw new NotFoundException(errors);
    }

    return this.usersBoardsService.create(createUsersBoardDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      type: 'array',
      items: { $ref: getSchemaPath(UsersBoard) },
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findAll() {
    return this.usersBoardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(UsersBoard) }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No users board found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.usersBoardsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(UsersBoard) }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No users board found'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() column: UpdateUsersBoardDto) {
    const { board_id, user_id } = column;
    const usersBoard = await this.usersBoardsService.findOne(id);

    if (!usersBoard) {
      throw new NotFoundException('UsersBoard does not exist');
    }

    const user = await this.usersService.findOne(user_id);
    const board = await this.boardsService.findOne(board_id);
    const errors = [];

    if (!user) {
      errors.push('User does not exist');
    }

    if (!board) {
      errors.push('Board does not exist');
    }

    if (errors.length) {
      throw new NotFoundException(errors);
    }

    return this.usersBoardsService.update(id, column);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'OK'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiNotFoundResponse({description: 'No users board found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    const usersBoard = await this.usersBoardsService.findOne(id);

    if (!usersBoard) {
      throw new NotFoundException('UsersBoard does not exist');
    }

    return this.usersBoardsService.delete(id);
  }
}
