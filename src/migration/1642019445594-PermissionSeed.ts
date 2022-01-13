import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionSeed1642019445594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('insert into permissions(name) values("player")')
        await queryRunner.query('insert into permissions(name) values("admin")')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('delete from permissions where name="player"')
        await queryRunner.query('delete from permissions where name="admin"')
    }

}
