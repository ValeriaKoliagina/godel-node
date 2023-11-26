import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';
import { BoardColumn } from '../../board_columns/entities/board_column.entity';

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: "assignee_id" })
  assignee: User;

  @ManyToOne(type => Board)
  @JoinColumn({ name: "board_id" })
  board: Board;

  @ManyToOne(type => BoardColumn)
  @JoinColumn({ name: "board_column_id" })
  board_column: BoardColumn;
}
