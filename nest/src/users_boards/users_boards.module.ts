import { Module } from '@nestjs/common';
import { UsersBoardsService } from './users_boards.service';
import { UsersBoardsController } from './users_boards.controller';

@Module({
  controllers: [UsersBoardsController],
  providers: [UsersBoardsService],
})
export class UsersBoardsModule {}
