import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginuser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('country/:id')
  async getUsersByCountry(@Param('id') countryId: number) {
    return await this.userService.getUsersByCountry(countryId);
  }

  @Get()
  async getUsers(
    @Query('country') country: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (!country) {
      return this.userService.findAll((page - 1) * limit, limit);
    } else {
      return this.userService.findUsers({ country, page, limit });
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserInId(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log('Login request received:', loginUserDto);
    const { username, password } = loginUserDto;

    // Проверяем пользователя через сервис
    const user = await this.userService.validateUser(username, password);

    // Если пользователь не найден или пароль неверный, выбрасываем исключение
    if (!user) {
      console.log('Invalid username or password');
      throw new UnauthorizedException('Invalid username or password');
    }

    // Возвращаем успешный ответ с именем пользователя и страной
    return { message: 'Login successful'};
  }


  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
