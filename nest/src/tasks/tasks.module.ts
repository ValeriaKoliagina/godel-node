import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Board } from 'src/boards/entities/board.entity';
import { BoardColumn } from 'src/board_columns/entities/board_column.entity';
import { User } from 'src/users/entities/user.entity';
import { BoardColumnsService } from 'src/board_columns/board_columns.service';
import { BoardsService } from 'src/boards/boards.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    TypeOrmModule.forFeature([BoardColumn]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Board])
  ],
  controllers: [TasksController],
  providers: [TasksService, BoardColumnsService, BoardsService, UsersService],
})
export class TasksModule {}
