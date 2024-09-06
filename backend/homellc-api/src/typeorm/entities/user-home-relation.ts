import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home';
import { User } from './user';

@Entity({ name: 'user_home_relation' })
export class UserHomeRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Home)
  @JoinColumn({ name: 'home_id' })
  home: Home;
}
