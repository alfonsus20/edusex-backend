import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Quiz, (quiz) => quiz.material)
  @JoinColumn()
  quiz: Quiz;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
