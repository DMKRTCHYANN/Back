import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntitiy } from './typeorm/entities/user.entity';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/country.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1337',
      database: 'mysql_nestjs',
      entities: [UserEntitiy, Country],
      synchronize: true,
    }),
    UsersModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
