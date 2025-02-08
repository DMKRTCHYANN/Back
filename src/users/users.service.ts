import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Country } from '../countries/entities/country.entity';
import * as bcrypt from 'bcrypt';

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

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['country'],
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return { username: user.username, country: user.country.name };
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

  async findByUsernameAndPassword(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['country'],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return undefined;
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

  async deleteUser(id: number) {
    const user = await this.getUserInId(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    return { message: `User with id ${id} deleted successfully` };
  }

  async findOne(
    username: string,
    pass: string,
  ): Promise<UserEntitiy | undefined> {
    console.log('Attempting login for username:', username);
    console.log('Attempting login for password:', pass);

    const users = await this.userRepository.find({
      where: { username },
    });

    console.log('Found users:', users);

    for (const user of users) {
      console.log('Checking user:', user);
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      console.log('Password valid:', isPasswordValid);

      if (isPasswordValid) {
        console.log('Valid user found:', user);
        return user;
      }
    }

    console.log('No valid user found');
    return undefined;
  }

  async findOneByUsername(username: string): Promise<UserEntitiy | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async hashExistingPasswords() {
    const users = await this.userRepository.find();
    for (const user of users) {
      if (!user.password.startsWith('$2b$')) {
        console.log(`Hashing password for user: ${user.username}`);
        user.password = await bcrypt.hash(user.password, 10);
        await this.userRepository.save(user);
      }
    }
  }
}
