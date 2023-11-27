import { IsUUID } from "class-validator";

export class CreateUsersBoardDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  board_id: string;
}
