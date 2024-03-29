import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.model';
import { Topic } from './topic.model';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text')
  illustration_url: string;

  @Column('text')
  video_url: string;

  @ManyToOne(() => Topic, (topic) => topic.materials)
  topic: Topic;

  @OneToOne(() => Quiz, (quiz) => quiz.material, { cascade: true })
  quiz: Quiz;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
