import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class UpdateBoardColumnsDto {
  @IsOptional()
  @IsUUID()
  board_id: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;
}
