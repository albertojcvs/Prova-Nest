import { HttpException, HttpStatus } from '@nestjs/common';
import { Bet } from '../bet.entity';

export class BetAlreadyExistsException extends HttpException {
  constructor(bet: Bet) {
    super(`The user already has a ${bet.game.type} bet with the numbers: ${bet.numbers}`, HttpStatus.CONFLICT);
  }
}
