import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Task } from '../../tasks/entities/task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity("board_columns")
export class BoardColumn {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: 'To do'
  })
  @Column()
  name: string;

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

  @OneToMany(type => Task, task => task.board_column)
  tasks: Task[];
}
