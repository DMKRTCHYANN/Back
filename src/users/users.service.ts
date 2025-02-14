import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Country } from '../countries/entities/country.entity';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntitiy)
    private readonly userRepository: Repository<UserEntitiy>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(offset: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['country'],
    });
    return { data: users, total };
  }

  async findUsers(filter: { country?: string; page: number; limit: number }) {
    const { country, page, limit } = filter;
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    const limitNumber = isNaN(Number(limit)) ? 10 : Number(limit);
    const query = this.userRepository.createQueryBuilder('user');
    query.leftJoinAndSelect('user.country', 'country');
    if (country) {
      query.andWhere('country.id = :country', { country });
    }
    query.skip((pageNumber - 1) * limitNumber).take(limitNumber);
    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['country'],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return {
      id: user.id,
      username: user.username,
      country: user.country.name,
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    let country = await this.countryRepository.findOneBy({
      name: createUserDto.country,
    });

    if (!country) {
      country = this.countryRepository.create({ name: createUserDto.country });
      await this.countryRepository.save(country);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      country,
      createdAt: new Date(),
    });

    return await this.userRepository.save(newUser);
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

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserInId(id);
    await this.userRepository.update(id, { ...updateUserDto });
    return await this.getUserInId(id);
  }

  async deleteUser(id: number) {
    const user = await this.getUserInId(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    return { message: `User with id ${id} deleted successfully` };
  }

  async getUsersByCountry(countryId: number) {
    return await this.userRepository.find({
      where: { country: { id: countryId } },
      relations: ['country'],
    });
  }

  async hashExistingPasswords() {
    const users = await this.userRepository.find();
    for (const user of users) {
      if (!user.password.startsWith('$2b$')) {
        user.password = await bcrypt.hash(user.password, 10);
        await this.userRepository.save(user);
      }
    }
  }

  async findOneByUsername(username: string): Promise<UserEntitiy | undefined> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['country'],
    });
  }
}
