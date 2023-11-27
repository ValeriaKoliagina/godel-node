import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  description: string;

  @IsOptional()
  @IsUUID()
  assignee_id: string;

  @IsOptional()
  @IsUUID()
  board_id: string;

  @IsOptional()
  @IsUUID()
  board_column_id: string;
}
