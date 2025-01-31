import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { UserEntitiy } from '../typeorm/entities/user.entity';

class UpdateCountryDto {}

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(UserEntitiy)
    private userRepository: Repository<UserEntitiy>,
  ) {}

  async createCountry(name: string): Promise<Country> {
    try {
      const country = this.countryRepository.create({ name });
      return await this.countryRepository.save(country);
    } catch (error) {
      this.logger.error(`Ошибка при создании страны: ${error.message}`);
      throw error;
    }
  }

  async deleteCountry(id: number) {
    const country = await this.countryRepository.findOne({ where: { id } });
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    // Update users referencing this country (set the country relation to null)
    await this.userRepository.update({ country: country }, { country: null });

    // Delete the country
    await this.countryRepository.delete(id);

    this.logger.log(`Country with id ${id} deleted successfully`);
    return { message: `Country with id ${id} deleted successfully` };
  }

  async findAll(): Promise<Country[]> {
    try {
      return await this.countryRepository.find();
    } catch (error) {
      this.logger.error(`Ошибка при получении списка стран: ${error.message}`);
      throw error;
    }
  }
  async getCountryInId(id: number) {
    const user = await this.countryRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return user;
  }
  async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.findOne({ where: { id } });
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    await this.countryRepository.update(id, updateCountryDto);
    return await this.countryRepository.findOne({
      where: { id },
    });
  }
}
