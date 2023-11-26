import { MigrationInterface, QueryRunner } from "typeorm";

export class Kanban1699191148971 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO KANBAN_COLUMNS (name) VALUES ('To Do'), ('In progress'), ('In review'), ('In testing'), ('Done'), ('To refine'), ('Cancelled'); `)
	}
   
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM KANBAN_COLUMNS WHERE name IN ('To Do', 'In progress', 'In review', 'In testing', 'Done', 'To refine', 'Cancelled'); `)
	}
}
