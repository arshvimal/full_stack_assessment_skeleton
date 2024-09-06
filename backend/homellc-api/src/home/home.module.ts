import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home/home.controller';
import { HomeService } from './service/home/home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from 'src/typeorm/entities/home';
import { UserHomeRelation } from 'src/typeorm/entities/user-home-relation';

@Module({
  imports: [
    TypeOrmModule.forFeature([Home]),
    TypeOrmModule.forFeature([UserHomeRelation]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
