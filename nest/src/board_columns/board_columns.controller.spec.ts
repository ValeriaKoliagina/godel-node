import { Test, TestingModule } from '@nestjs/testing';
import { BoardColumnsController } from './board_columns.controller';
import { BoardColumnsService } from './board_columns.service';

describe('BoardColumnsController', () => {
  let controller: BoardColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardColumnsController],
      providers: [BoardColumnsService],
    }).compile();

    controller = module.get<BoardColumnsController>(BoardColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
