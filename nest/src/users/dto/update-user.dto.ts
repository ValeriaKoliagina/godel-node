import { IsEmail, Length, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class UpdateUserDto {
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
