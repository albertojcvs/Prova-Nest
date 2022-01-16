import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/LoginUserDTO';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}

  async login(data: LoginUserDTO) {
    const response = await this.authService.validateUser(data);

    return response
    
  }
}
