import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomEntity } from './room.entity';

@Entity({
  name: 'contract',
})
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => RoomEntity, (room) => room.contracts)
  @JoinColumn()
  room: RoomEntity;

  @OneToOne(() => UserEntity, (user) => user.contract)
  @JoinColumn()
  user: UserEntity;
}
