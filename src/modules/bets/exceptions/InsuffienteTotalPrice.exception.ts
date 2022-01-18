import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufifcentTotalPrice extends HttpException {
  constructor() {
    super('The cart total velue is not enough!', HttpStatus.CONFLICT);
  }
}
