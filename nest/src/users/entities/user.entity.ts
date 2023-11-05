import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Board } from '../../boards/entities/board.entity';

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @OneToMany(type => Task, task => task.assignee_id)
  tasks: Task[];

  @ManyToMany(type => Board, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "users_boards",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "board_id",
      referencedColumnName: "id"
    },
    synchronize: false,
  })
  boards: Board[]
}
