import { Controller, Get, Query } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Controller('pagination')
export class PaginationController {
  constructor(private readonly paginationService: PaginationService) {}

  @Get('users')
  async getUsers(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
  ) {
    if (page < 1 || perPage < 1) {
      throw new Error('Invalid pagination parameters');
    }
    return this.paginationService.getPaginatedUsers(page, perPage);
  }
}
