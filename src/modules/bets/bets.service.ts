import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/modules/auth/decorators/CurrentUser';
import { CartsService } from 'src/modules/carts/carts.service';
import { GameNotFound } from 'src/modules/games/exceptions/GameNotFound.exception';
import { GamesService } from 'src/modules/games/games.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Repository, Transaction } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Bet } from './bet.entity';
import { CreateBetDTO } from './dto/CreateBetDto';
import { BetAlreadyExistsException } from './exceptions/BetAlreadyExists.exception';
import { BetNotFoundException } from './exceptions/BetNotFound.exception';
import { BetWrongLenght } from './exceptions/BetWrongLenght.exception';
import { InsufifcentTotalPrice } from './exceptions/InsuffienteTotalPrice.exception';
import { NumberOutOfRangeException } from './exceptions/NumberOutOfRange.exception';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet) private betsRepository: Repository<Bet>,
    private cartsService: CartsService,
    private usersService: UsersService,
    private gamesService: GamesService,
    private mailService: MailService,
  ) {}

  async getAll() {
    return await this.betsRepository.find();
  }

  async getOne(id: string) {
    const bet = await this.betsRepository.findOne({ where: { id } });

    if (!bet) throw new BetNotFoundException();

    return bet;
  }

  async create(data: CreateBetDTO, user: User) {
    let betsPriceTotal = 0;

    const bets = data.bets;

    try {
      const betsToSave = await Promise.all(
        bets.map(async (bet) => {
          const game = await this.gamesService.getOne(bet.gameId);

          const betAlreadyExists = await this.betsRepository.findOne({
            where: { user, numbers: bet.numbers, game },
          });

          if (betAlreadyExists)
            throw new BetAlreadyExistsException(betAlreadyExists);
          const betToSave = this.betsRepository.create({
            user,
            game,
            numbers: bet.numbers,
          });
          const betNumbersInArray: number[] = bet.numbers
            .split(', ')
            .map((number) => Number(number));

          betNumbersInArray.sort();

          console.log(user);

          if (betNumbersInArray.length !== game.maxNumber)
            throw new BetWrongLenght();

          if (betNumbersInArray[betNumbersInArray.length - 1] > game.range)
            throw new NumberOutOfRangeException();

          betsPriceTotal += game.price;

          return betToSave;
        }),
      );
      
      
      const cart = (await this.cartsService.getAll())[0];


      if (betsPriceTotal < cart.minValue) throw new InsufifcentTotalPrice();

      await this.betsRepository.save(betsToSave);
      
      this.mailService.sendNewBetsEmail(
        {
          from: 'loteria@loteria.com',
          to: user.email,
          subject: null,
        },
        user,
        betsToSave,
      );

      return betsToSave
    } catch (error) {
      throw new Error('It is not posible to save duplicated bets!');
    }
  }

  async delete(id: string) {
    const bet = await this.betsRepository.findOne({ where: { id } });

    if (!bet) throw new GameNotFound();

    await this.betsRepository.delete(id);
  }
}
