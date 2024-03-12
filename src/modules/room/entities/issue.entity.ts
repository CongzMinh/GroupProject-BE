import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinTable,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
@Entity({ name: 'issues' })
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  fixed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.issues)
  @JoinTable()
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.issues)
  @JoinTable()
  room: RoomEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
