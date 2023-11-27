import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBoardColumnCascadeDelete1701035844859 implements MigrationInterface {
    name = 'AddBoardColumnCascadeDelete1701035844859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_855d484825b715c545349212c7f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e1273606f4055f3229645e3faf6"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "assignee_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "board_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "board_column_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_columns" ALTER COLUMN "board_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_855d484825b715c545349212c7f" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e1273606f4055f3229645e3faf6" FOREIGN KEY ("board_column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e1273606f4055f3229645e3faf6"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_855d484825b715c545349212c7f"`);
        await queryRunner.query(`ALTER TABLE "board_columns" ALTER COLUMN "board_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "board_column_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "board_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "assignee_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e1273606f4055f3229645e3faf6" FOREIGN KEY ("board_column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_855d484825b715c545349212c7f" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
