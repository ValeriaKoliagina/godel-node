import { Board } from "src/boards/entities/board.entity";
import { KanbanColumn } from "src/kanban_columns/entities/kanban_column.entity";

export class CreateBoardColumnsDto {
  kanban_id: string;
  board_id: Board;
  name: string;
}
