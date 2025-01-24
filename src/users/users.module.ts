import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Country } from '../countries/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitiy, Country])], // Зарегистрированы репозитории
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Экспортируем, если нужно использовать в других модулях
})
export class UsersModule {}
