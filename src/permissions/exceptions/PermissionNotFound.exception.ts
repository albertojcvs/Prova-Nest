import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionNotFound extends HttpException {
  constructor() {
    super({ error: { message: 'Permission not found' } }, HttpStatus.NOT_FOUND);
  }
}
