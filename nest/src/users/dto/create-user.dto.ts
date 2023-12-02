import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, MinLength, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/roles/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'Vasia'
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 8,
    example: 'Qw12!@urieo'
  })
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: 'user'
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
