import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users_boards")
export class UsersBoard {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @Column("uuid")
  user_id: string;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @Column("uuid")
  board_id: string;
}
