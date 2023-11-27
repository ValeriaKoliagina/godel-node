import { IsUUID } from "class-validator";

export class CreateBoardColumnsDto {
  @IsUUID()
  kanban_id: string;

  @IsUUID()
  board_id: string;

  name: string;
}
