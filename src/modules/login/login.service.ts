import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginUserDTO } from './dto/LoginUserDTO';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}

  async login(data: LoginUserDTO) {
    const response = await this.authService.validateUser(data);

    return response
    
  }
}
