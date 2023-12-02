import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from 'src/roles/roles.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Vasia'
  })
  name: string;

  @ApiPropertyOptional({
    example: 'user@gmail.com'
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    minLength: 8,
    example: 'Qw12!@urieo'
  })
  @IsOptional()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    enum: UserRole
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
