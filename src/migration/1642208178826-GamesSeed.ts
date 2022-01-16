import { MigrationInterface, QueryRunner } from 'typeorm';

export class GamesSeed1642208178826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'Insert into games(games.type, price, description, games.range, maxNumber, color) values("Lotofácil", 2.5,"Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!", 15, 15, "#7F3992")',
    );
    await queryRunner.query(
      'Insert into games(games.type, price, description, games.range, maxNumber, color) values("Mega-Sena", 4.5,"Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.",60,6, "#01AC66")',
    );
    await queryRunner.query(
      'Insert into games(games.type, price, description, games.range, maxNumber, color) values("Quina", 2,"Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.",80,5, "#F79C31")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}