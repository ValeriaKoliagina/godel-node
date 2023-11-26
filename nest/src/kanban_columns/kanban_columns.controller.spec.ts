import { Test, TestingModule } from '@nestjs/testing';
import { KanbanColumnsController } from './kanban_columns.controller';
import { KanbanColumnsService } from './kanban_columns.service';

describe('KanbanColumnsController', () => {
  let controller: KanbanColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KanbanColumnsController],
      providers: [KanbanColumnsService],
    }).compile();

    controller = module.get<KanbanColumnsController>(KanbanColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
