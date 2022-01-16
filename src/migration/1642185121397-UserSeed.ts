import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeed1642185121397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'Insert into users(email, password, username) values("albertoadmin@gmail.com", "$2b$10$DhQ4SApH6p0LsY2kYPar8ugSYd6bhUknq6LtGsRSaObdwjqE51gQa", "albertoadmin")',
    );

    await queryRunner.query(
      'Insert into user_permissions(permissionsId,usersId) values(2,1)',
    );
    await queryRunner.query(
      'Insert into user_permissions(permissionsId,usersId) values(1,1)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
