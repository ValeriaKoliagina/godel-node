import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KanbanColumnsService } from './kanban_columns.service';
import { KanbanColumnsController } from './kanban_columns.controller';
import { KanbanColumn } from './entities/kanban_column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KanbanColumn])],
  controllers: [KanbanColumnsController],
  providers: [KanbanColumnsService],
  exports: [KanbanColumnsService]
})

export class KanbanColumnsModule {}
