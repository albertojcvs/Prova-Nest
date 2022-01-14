import { HttpException, HttpStatus } from '@nestjs/common';

export class CartAttributeAlreadyExistsException extends HttpException {
  constructor(atribute:string) {
    super(`Attribute already ${atribute} exists!`, HttpStatus.CONFLICT);
  }
}
