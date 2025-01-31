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
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Получение пользователей по стране (с использованием countryId)
  @Get('country/:id')
  async getUsersByCountry(@Param('id') countryId: number) {
    return await this.userService.getUsersByCountry(countryId);
  }

  // Получение пользователей с пагинацией, с возможностью фильтрации по стране
  @Get()
  async getUsers(
    @Query('country') country: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    // Если параметр country не передан, используем метод findAll
    if (!country) {
      return this.userService.findAll((page - 1) * limit, limit);
    } else {
      return this.userService.findUsers({ country, page, limit });
    }
  }

  // Получение пользователя по id
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserInId(id);
  }

  // Создание нового пользователя
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // Обновление пользователя по id
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // Удаление пользователя по id
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
