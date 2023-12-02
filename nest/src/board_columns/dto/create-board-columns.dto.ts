import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBoardColumnsDto {
  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  kanban_id: string;

  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  board_id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
