import { Test, TestingModule } from '@nestjs/testing';
import { UsersBoardsController } from './users_boards.controller';
import { UsersBoardsService } from './users_boards.service';

describe('UsersBoardsController', () => {
  let controller: UsersBoardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersBoardsController],
      providers: [UsersBoardsService],
    }).compile();

    controller = module.get<UsersBoardsController>(UsersBoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
