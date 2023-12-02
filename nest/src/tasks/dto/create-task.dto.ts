import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  assignee_id: string;

  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  board_id: string;

  @ApiProperty({
    format: 'uuid'
  })
  @IsUUID()
  board_column_id: string;
}
