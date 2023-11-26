import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("kanban_columns")
export class KanbanColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
