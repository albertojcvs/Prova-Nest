import { HttpException, HttpStatus } from '@nestjs/common';

export class BetNotFoundException extends HttpException {
  constructor() {
    super('Bet not Found!', HttpStatus.NOT_FOUND);
  }
}
