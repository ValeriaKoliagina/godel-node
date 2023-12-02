import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateBoardColumnsDto {
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
  @IsNotEmpty()
  name: string;
}
