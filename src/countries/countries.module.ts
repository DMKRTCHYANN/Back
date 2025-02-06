import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country } from './entities/country.entity';
import { UserEntitiy } from '../typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, UserEntitiy])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
