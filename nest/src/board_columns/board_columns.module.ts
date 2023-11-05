import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardColumnsService } from './board_columns.service';
import { BoardColumnsController } from './board_columns.controller';
import { BoardColumn } from './entities/board_column.entity';
import { KanbanColumnsService } from 'src/kanban_columns/kanban_columns.service';
import { KanbanColumn } from 'src/kanban_columns/entities/kanban_column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn]), TypeOrmModule.forFeature([KanbanColumn])],
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService, KanbanColumnsService],
})
export class BoardColumnsModule {}
