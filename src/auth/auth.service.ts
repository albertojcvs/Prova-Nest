import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneBy('email', email);
    const isSamePassword = await compare(user.password, password);
    if (user && isSamePassword) {
      const token = this.jwtToken(user);
      return {
        token,
        user,
      };
    }
    throw new UnauthorizedException('Incorrect password');

  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
