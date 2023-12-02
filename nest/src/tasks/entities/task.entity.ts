import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';
import { BoardColumn } from '../../board_columns/entities/board_column.entity';

@Entity("tasks")
export class Task {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiPropertyOptional({
    example: 'To do - to do - to do - to do - to do'
  })
  @Column()
  name: string;

  @ApiPropertyOptional({
    example: 'Do like a pink panter'
  })
  @Column()
  description: string;

  @ManyToOne(type => User, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: "assignee_id" })
  assignee: User;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @Column()
  assignee_id: string;

  @ManyToOne(type => Board, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "board_id" })
  board: Board;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @Column()
  board_id: string;

  @ManyToOne(type => BoardColumn)
  @JoinColumn({ name: "board_column_id" })
  board_column: BoardColumn;

  @ApiPropertyOptional({
    format: 'uuid'
  })
  @Column()
  board_column_id: string;
}
