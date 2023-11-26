import { IsUUID } from "class-validator";
import { Board } from "src/boards/entities/board.entity";

export class CreateBoardColumnsDto {
  @IsUUID()
  kanban_id: string;

  @IsUUID()
  board_id: string;

  name: string;
}
