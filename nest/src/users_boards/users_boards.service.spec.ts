import { Test, TestingModule } from '@nestjs/testing';
import { UsersBoardsService } from './users_boards.service';

describe('UsersBoardsService', () => {
  let service: UsersBoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersBoardsService],
    }).compile();

    service = module.get<UsersBoardsService>(UsersBoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
