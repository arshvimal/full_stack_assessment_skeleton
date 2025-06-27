import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'home' })
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  street_address: string;

  @Column({ length: 50, nullable: true })
  state: string;

  @Column({ length: 10, nullable: true })
  zip: string;

  @Column({ type: 'double precision', nullable: true })
  sqft: number;

  @Column({ type: 'int', nullable: true })
  beds: number;

  @Column({ type: 'int', nullable: true })
  baths: number;

  @Column({ type: 'double precision', nullable: true })
  list_price: number;
}
