import { HttpException, HttpStatus } from '@nestjs/common';
import { Bet } from '../bet.entity';

export class BetAlreadyExistsException extends HttpException {
  constructor(bet: Bet) {
    super(`The bet ${bet} already exists`, HttpStatus.CONFLICT);
  }
}
