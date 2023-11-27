import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity("board_columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Board, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "board_id" })
  board: Board;

  @Column()
  board_id: string;

  @OneToMany(type => Task, task => task.board_column)
  tasks: Task[];
}
