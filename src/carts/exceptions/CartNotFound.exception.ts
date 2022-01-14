import { HttpException, HttpStatus } from '@nestjs/common';

export class CartNotFoundException extends HttpException {
  constructor() {
    super('Cart not Found!', HttpStatus.NOT_FOUND);
  }
}
