import { HttpException, HttpStatus } from '@nestjs/common';

export class BetWrongLenght extends HttpException {
  constructor() {
    super('The bet lenght is incorrect for the game type', HttpStatus.CONFLICT);
  }
}
