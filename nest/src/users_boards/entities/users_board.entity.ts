import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users_boards")
export class UsersBoard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @Column("uuid")
  board_id: string;
}
