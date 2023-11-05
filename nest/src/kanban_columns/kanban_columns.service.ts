import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KanbanColumn } from './entities/kanban_column.entity';

@Injectable()
export class KanbanColumnsService {
  constructor(
    @InjectRepository(KanbanColumn)
    private kanbanColumnRepository: Repository<KanbanColumn>,
  ) {}

  async findOne(id: string) {
    return this.kanbanColumnRepository.findOneBy({ id });
  }
}
