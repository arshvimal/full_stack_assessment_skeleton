import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  findByHome(homeId: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user_home_relation', 'uhr', 'uhr.user_id = user.id')
      .where('uhr.home_id = :homeId', { homeId })
      .getMany();
  }
}
