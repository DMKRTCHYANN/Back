import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const accessToken = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return { access_token: accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      country: req.user.country,
    };
  }
}
