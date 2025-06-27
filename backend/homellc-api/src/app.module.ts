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
        type: 'postgres',
        host: configService.getOrThrow('PG_HOST'),
        port: configService.getOrThrow('PG_PORT'),
        username: configService.getOrThrow('PG_USER'),
        password: configService.getOrThrow('PG_PASSWORD'),
        database: configService.getOrThrow('PG_DATABASE'),
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
