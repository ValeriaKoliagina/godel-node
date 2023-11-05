import { IsEmail, Length } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  role: UserRole;
}
