import { IsOptional, IsUUID } from "class-validator";

export class UpdateUsersBoardDto {
  @IsOptional()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsUUID()
  board_id: string;
}
