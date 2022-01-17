import { HttpException, HttpStatus } from '@nestjs/common';

export class NumberOutOfRangeException extends HttpException {
  constructor() {
    super('The bet has numbers that is not the game range', HttpStatus.CONFLICT);
  }
}
