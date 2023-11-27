import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsUUID()
  assignee_id: string;

  @IsUUID()
  board_id: string;

  @IsUUID()
  board_column_id: string;
}
