import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDTO } from './dto/CreateGameDTO';
import { UpdateGameDTO } from './dto/UpdateGameDTO';
import { GameAttributeAlreadyExistsExceptio } from './exceptions/GameAttributeAlreadyExists.exception';
import { GameNotFound } from './exceptions/GameNotFound.exception';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  private async validateIfGameRequiredAttributesExists({
    type,
  }: CreateGameDTO | UpdateGameDTO) {
    if (type) {
      const game = await this.gamesRepository.findOne({ where: { type } });

      if (game) throw new GameAttributeAlreadyExistsExceptio('type');
    }
  }

  async getAll() {
    return await this.gamesRepository.find();
  }

  async getOne(id: string) {
    const game = await this.gamesRepository.findOne({ where: { id } });

    if (!game) throw new GameNotFound();

    return game;
  }

  async create(data: CreateGameDTO) {
    await this.validateIfGameRequiredAttributesExists(data);

    const game = this.gamesRepository.create(data);
    return await this.gamesRepository.save(game);
  }

  async update(id: string, data: UpdateGameDTO) {
    await this.validateIfGameRequiredAttributesExists(data);

    await this.gamesRepository.update(id, data);
    const game = await this.gamesRepository.findOne(id);
    if (!game) throw new GameNotFound();
    return game;
  }
  async delete(id: string) {
    const game = await this.gamesRepository.findOne(id);
    if (!game) throw new GameNotFound();
    await this.gamesRepository.delete(id);
  }
}
