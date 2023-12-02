import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Task } from '../../tasks/entities/task.entity';
import { BoardColumn } from '../../board_columns/entities/board_column.entity';
import { User } from '../../users/entities/user.entity';

@Entity("boards")
export class Board {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: 'Exaple board'
  })
  @Column()
  name: string;

  @OneToMany(type => Task, task => task.board)
  tasks: Task[];

  @OneToMany(type => BoardColumn, boardColumn => boardColumn.board)
  board_columns: BoardColumn[];

  @ManyToMany((type) => User, (user) => user.id, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinTable({
    name: "users_boards",
    joinColumn: {
      name: "board_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    synchronize: false,
  })
  users: User[]
}
