import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardColumnsService } from './board_columns.service';
import { BoardColumnsController } from './board_columns.controller';
import { BoardColumn } from './entities/board_column.entity';
import { KanbanColumnsService } from 'src/kanban_columns/kanban_columns.service';
import { KanbanColumn } from 'src/kanban_columns/entities/kanban_column.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardColumn]),
    TypeOrmModule.forFeature([KanbanColumn]),
    TypeOrmModule.forFeature([Board]),
    UsersModule,
    AuthModule,
  ],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService, KanbanColumnsService, BoardsService],
})
export class BoardColumnsModule {}
