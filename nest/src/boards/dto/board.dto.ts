import { IsNotEmpty } from "class-validator";

export class BoardDto {
  @IsNotEmpty()
  name: string;
}
