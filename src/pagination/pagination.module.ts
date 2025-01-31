import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { PaginationController } from './pagination.controller';
import { PaginationService } from './pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitiy])],
  controllers: [PaginationController],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
