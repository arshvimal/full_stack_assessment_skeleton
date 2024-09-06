import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { Home } from './typeorm/entities/home';
import { UserHomeRelation } from './typeorm/entities/user-home-relation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        username: configService.getOrThrow('MYSQL_USER'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        entities: [User, Home, UserHomeRelation],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
