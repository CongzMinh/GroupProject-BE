import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
@Entity({ name: 'issues' })
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  fixed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.issues)
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.issues)
  room: RoomEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
