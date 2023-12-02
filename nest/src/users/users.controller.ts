import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Board } from 'src/boards/entities/board.entity';

@Controller('users')
@ApiExtraModels(User)
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user created successfully',
    schema: { $ref: getSchemaPath(User) },
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    schema: { 
      type: 'array',
      items: { $ref: getSchemaPath(User) },
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: {
      allOf: [
        { $ref: getSchemaPath(User) },
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
            boards: {
              type: 'array',
              items: { $ref: getSchemaPath(Board) },
            },
          },
        },
      ],
    }
  })
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(User) },
  })
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() column: UpdateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.usersService.update(id, column);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'OK',
    schema: {
      example: {
        id: 'uuid is here',
        status: 'inactive'
      }
    }
  })
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiForbiddenResponse({description: 'Not enough rights'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.usersService.delete(id);
  }

  @Post('sign-up')
  @ApiCreatedResponse({
    description: 'The user created successfully',
    schema: { $ref: getSchemaPath(User) }
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.usersService.create(signUpUserDto);
  }

  @Post('sign-in')
  @ApiCreatedResponse({
    description: 'The token created successfully',
    schema: {
      example: {
        name: 'Vasia',
        expiresIn: '1d',
        accessToken: 'token is here'
      }
    }
  })
  @ApiBadRequestResponse({description: 'No required info provided'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong'})
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }
}
