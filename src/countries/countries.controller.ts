import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CountriesService } from './countries.service';

class UpdateCountryDto {}

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(@Body('name') name: string) {
    if (!name) {
      throw new HttpException(
        'Название страны обязательно',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.countriesService.createCountry(name);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new HttpException(
          'Страна с таким названием уже существует',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.countriesService.findAll();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении стран',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  async getUserInId(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.getCountryInId(id);
  }

  @Put(':id')
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return await this.countriesService.updateCountry(id, updateCountryDto);
  }

  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.countriesService.deleteCountry(id);
    } catch (error) {
      console.error(error);
    }
  }
}
