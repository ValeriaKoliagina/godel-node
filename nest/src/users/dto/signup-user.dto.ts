import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpUserDto {
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
}
