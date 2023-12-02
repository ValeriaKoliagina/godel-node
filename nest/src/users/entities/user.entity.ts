import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Task } from '../../tasks/entities/task.entity';
import { Board } from '../../boards/entities/board.entity';
import { UserRole } from '../../roles/roles.enum';

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity("users")
export class User {
  @ApiProperty({
    format: 'uuid'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiPropertyOptional({
    example: 'Vasia'
  })
  @Column()
  name: string;

  @ApiPropertyOptional({
    example: 'user@gmail.com'
  })
  @Column()
  email: string;

  @ApiPropertyOptional()
  @Column()
  password: string;

  @ApiPropertyOptional({
    enum: UserRole
  })
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @ApiPropertyOptional({
    enum: UserStatus
  })
  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus

  @OneToMany(type => Task, task => task.assignee)
  tasks: Task[];

  @ManyToMany(type => Board, {
    cascade: true,
    onDelete: "CASCADE"
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
