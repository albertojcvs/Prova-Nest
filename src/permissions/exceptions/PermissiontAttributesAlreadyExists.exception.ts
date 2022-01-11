import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionAttributeAlreadyExists extends HttpException {
  constructor(attribute:string) {
    super({ error: { message: `The attribute ${attribute} already exists` } }, HttpStatus.CONFLICT);
  }
}
