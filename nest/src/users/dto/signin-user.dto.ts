import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInUserDto {
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
