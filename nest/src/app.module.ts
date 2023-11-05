import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { KanbanColumnsModule } from './kanban_columns/kanban_columns.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardColumnsModule } from './board_columns/board_columns.module';
import { UsersBoardsModule } from './users_boards/users_boards.module';

import { User } from './users/entities/user.entity';
import { BoardColumn } from './board_columns/entities/board_column.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { KanbanColumn } from './kanban_columns/entities/kanban_column.entity';
import { UsersBoard } from './users_boards/entities/users_board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      // entities: ['./src/*/entities/*.entity.{ts, js}'],
      entities: [User, BoardColumn, Board, Task, KanbanColumn, UsersBoard],
      migrations: [],
      synchronize: false,
    }),
    HealthModule,
    UsersModule,
    BoardsModule,
    KanbanColumnsModule,
    TasksModule,
    BoardColumnsModule,
    UsersBoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
