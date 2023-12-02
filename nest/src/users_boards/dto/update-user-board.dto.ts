import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateUsersBoardDto {
  @ApiPropertyOptional({
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  board_id: string;
}
