import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';

@Injectable()
export class PaginationService {
  constructor(
    @InjectRepository(UserEntitiy)
    private userRepository: Repository<UserEntitiy>,
  ) {}

  async getPaginatedUsers(
    page: number | string = 1,
    perPage: number | string = 5,
  ) {
    page = isNaN(Number(page)) || Number(page) < 1 ? 1 : Number(page);
    perPage =
      isNaN(Number(perPage)) || Number(perPage) < 1 ? 5 : Number(perPage);

    const skip = (page - 1) * perPage;
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: perPage,
    });
    const totalPages = Math.ceil(total / perPage);
    return {
      data: users,
      pagination: {
        total,
        page,
        perPage,
        totalPages,
      },
    };
  }
}
