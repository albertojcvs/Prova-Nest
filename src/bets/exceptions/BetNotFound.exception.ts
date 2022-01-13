import { HttpException, HttpStatus } from '@nestjs/common';

export class BetNotFoundException extends HttpException {
  constructor() {
    super('Game not Found!', HttpStatus.NOT_FOUND);
  }
}
