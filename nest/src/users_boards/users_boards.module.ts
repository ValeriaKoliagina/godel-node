import { Module } from '@nestjs/common';
import { UsersBoardsService } from './users_boards.service';
import { UsersBoardsController } from './users_boards.controller';
import { UsersBoard } from './entities/users_board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersBoard])],
  controllers: [UsersBoardsController],
  providers: [UsersBoardsService],
})
export class UsersBoardsModule {}
