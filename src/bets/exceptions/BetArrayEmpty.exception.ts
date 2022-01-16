import { HttpException, HttpStatus } from '@nestjs/common';

export class BetArrayEmpty extends HttpException {
  constructor() {
    super('The array of bets is empty!', HttpStatus.CONFLICT);
  }
}
