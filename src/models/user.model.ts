import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

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
}
