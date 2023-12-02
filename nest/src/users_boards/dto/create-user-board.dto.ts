import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateUsersBoardDto {
  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  board_id: string;
}
