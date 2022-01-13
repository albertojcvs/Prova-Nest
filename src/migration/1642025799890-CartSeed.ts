import {MigrationInterface, QueryRunner} from "typeorm";

export class CartSeed1642025799890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('insert into carts(minValue) values(30)')
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('delete from carts where minValue=30')
    }

}
