import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from 'src/typeorm/entities/home';
import { UserHomeRelation } from 'src/typeorm/entities/user-home-relation';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
    @InjectRepository(UserHomeRelation)
    private userHomeRelationRepository: Repository<UserHomeRelation>,
  ) {}

  async findByUser(userId: number, page: number, pageSize: number) {
    const [results, total] = await this.homeRepository
      .createQueryBuilder('home')
      .innerJoin('user_home_relation', 'uhr', 'uhr.home_id = home.id')
      .where('uhr.user_id = :userId', { userId })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const totalPages = Math.ceil(total / pageSize);

    return {
      results,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async updateUsers(homeId: number, userIds: number[]) {
    await this.userHomeRelationRepository.delete({ home: { id: homeId } });
    const relations = userIds.map((userId) => ({
      home: { id: homeId },
      user: { id: userId },
    }));
    await this.userHomeRelationRepository.save(relations);
    return { message: 'Updated Successfully' };
  }
}
