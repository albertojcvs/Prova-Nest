import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { AuthenticationResponseDTO } from './dto/AuthenticationResponseDTO';
import { ValidateUserDTO } from './dto/ValidateUserDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: ValidateUserDTO): Promise<AuthenticationResponseDTO> {
    const user = await this.usersService.getOneBy('email', email);
    const isSamePassword = await compare( password, user.password);
    if (user && isSamePassword) {
      const token = await this.jwtToken(user);
      return {
        token,
        user,
      };
    }
    throw new UnauthorizedException('Incorrect email or password');
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(payload);
  }
}
