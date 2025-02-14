import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntitiy } from '../typeorm/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private: any;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserEntitiy) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserEntitiy | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = {
      id: user.id,
      username: user.username,
      country: user.country,
    };
    return this.jwtService.sign(payload);
  }
}
