// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Получить всех пользователей или отфильтровать по стране
  @Get()
  async getUsers(@Query('countryId') countryId?: number) {
    console.log(countryId);




    return countryId
      ? await this.userService.getUsersByCountry(countryId)
      : await this.userService.getUsers();
  }


  // Получить одного пользователя по ID
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserInId(id);
  }

  // Создать нового пользователя
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // Обновить пользователя
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // Удалить пользователя
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
