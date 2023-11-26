import { Controller } from '@nestjs/common';
import { UsersBoardsService } from './users_boards.service';

@Controller('users-boards')
export class UsersBoardsController {
  constructor(private readonly usersBoardsService: UsersBoardsService) {}
}
