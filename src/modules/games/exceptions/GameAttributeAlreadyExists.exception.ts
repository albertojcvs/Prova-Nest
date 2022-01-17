import { HttpException, HttpStatus } from '@nestjs/common';

export class GameAttributeAlreadyExistsExceptio extends HttpException {
  constructor(attribute:string) {
    super(`The attribute ${attribute} already exists!`, HttpStatus.CONFLICT);
  }
}
