import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDTO } from 'src/games/dto/CreateGameDTO';
import { GameNotFound } from 'src/games/exceptions/GameNotFound.exception';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';

@Injectable()
export class BetsService {
  constructor(@InjectRepository(Bet) private betsRepository: Repository<Bet>) {}

  async getAll() {
    return await this.betsRepository.find();
  }

  async getOne(id: string) {
    const bet = await this.betsRepository.findOne({ where: { id } });

    if (!bet) throw new GameNotFound();

    return bet;
  }

  async create(data: CreateGameDTO) {}

  async delete(id: string) {
    const bet = await this.betsRepository.findOne({ where: { id } });

    if (!bet) throw new GameNotFound();

    await await this.betsRepository.delete(id)
  }
}
