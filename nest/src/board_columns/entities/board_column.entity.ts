import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity("board_columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Board)
  @JoinColumn({ name: "board_id" })
  board_id: Board;

  @OneToMany(type => Task, task => task.board_column_id)
  tasks: Task[];
}
