import { Module } from '@nestjs/common';
import { UsersBoardsService } from './users_boards.service';
import { UsersBoardsController } from './users_boards.controller';
import { UsersBoard } from './entities/users_board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersBoard]),
    AuthModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [UsersBoardsController],
  providers: [UsersBoardsService, BoardsService, UsersService],
})
export class UsersBoardsModule {}
