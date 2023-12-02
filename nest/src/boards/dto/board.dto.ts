import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BoardDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
