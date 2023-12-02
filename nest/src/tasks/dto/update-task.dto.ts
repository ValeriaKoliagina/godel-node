import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  assignee_id: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  board_id: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  board_column_id: string;
}
