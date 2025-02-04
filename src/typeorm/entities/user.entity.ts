import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity({ name: 'users' })
export class UserEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  // @Column({ nullable: true, default: '' })
  // country: string;

  @ManyToOne(() => Country, (country) => country.users, { nullable: true })
  country: Country;
}
