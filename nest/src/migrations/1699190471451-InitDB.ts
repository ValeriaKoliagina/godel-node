import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1699190471451 implements MigrationInterface {
	name = 'InitDB1699190471451'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
		await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "assignee_id" uuid, "board_id" uuid, "board_column_id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "board_columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "board_id" uuid, CONSTRAINT "PK_e3da51ad65560ca495d3a621d32" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "kanban_columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_502614605b052be980fc3cd3836" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "users_boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "board_id" uuid NOT NULL, CONSTRAINT "PK_aa0cc2f87c4808e66fe9446a93d" PRIMARY KEY ("id"))`);
		await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_855d484825b715c545349212c7f" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e1273606f4055f3229645e3faf6" FOREIGN KEY ("board_column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`);
		await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e1273606f4055f3229645e3faf6"`);
		await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef"`);
		await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_855d484825b715c545349212c7f"`);
		await queryRunner.query(`DROP TABLE "users_boards"`);
		await queryRunner.query(`DROP TABLE "kanban_columns"`);
		await queryRunner.query(`DROP TABLE "board_columns"`);
		await queryRunner.query(`DROP TABLE "boards"`);
		await queryRunner.query(`DROP TABLE "tasks"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
	}
}
