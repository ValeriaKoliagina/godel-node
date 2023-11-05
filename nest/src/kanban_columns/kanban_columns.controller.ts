import { Controller } from '@nestjs/common';
import { KanbanColumnsService } from './kanban_columns.service';

@Controller('kanban-columns')
export class KanbanColumnsController {
  constructor(private readonly kanbanColumnsService: KanbanColumnsService) {}
}
