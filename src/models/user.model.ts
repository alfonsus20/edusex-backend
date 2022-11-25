import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Index({ unique: true })
  @Column('text')
  email: string;

  @Column('text', { nullable: true })
  avatar_url: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
