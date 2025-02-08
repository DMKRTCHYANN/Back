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

  @Get('hash-passwords')
  async hashPasswords(): Promise<string> {
    await this.userService.hashExistingPasswords();
    return 'Passwords have been hashed if necessary';
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
    console.log('Login request received:', {
      username: loginUserDto.username,
      password: loginUserDto.password,
    });
    return await this.userService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
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
