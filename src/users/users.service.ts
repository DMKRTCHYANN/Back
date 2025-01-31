import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Country } from '../countries/entities/country.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntitiy)
    private userRepository: Repository<UserEntitiy>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(offset: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['country'],
    });
    return {
      data: users,
      total,
    };
  }

  async getUsers() {
    return await this.userRepository.find({
      relations: ['country'],
    });
  }

  async getUsersByCountry(countryId: number): Promise<UserEntitiy[]> {
    return await this.userRepository.find({
      where: { country: { id: countryId } },
      relations: ['country'],
    });
  }

  async getUserInId(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    let country = await this.countryRepository.findOneBy({
      name: createUserDto.country,
    });
    if (!country) {
      country = this.countryRepository.create({
        name: createUserDto.country,
      });
      await this.countryRepository.save(country);
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      country,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  async findUsers(filter: { country?: string; page: number; limit: number }) {
    const { country, page, limit } = filter;
    const query = this.userRepository.createQueryBuilder('user');

    if (country) {
      query.andWhere('user.country = :country', { country });
    }

    query.skip((page - 1) * limit).take(limit);
    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserInId(id);
    await this.userRepository.update(id, { ...updateUserDto });
    return await this.getUserInId(id);
  }

  // Удаление пользователя
  async deleteUser(id: number) {
    const user = await this.getUserInId(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    return { message: `User with id ${id} deleted successfully` };
  }
}
