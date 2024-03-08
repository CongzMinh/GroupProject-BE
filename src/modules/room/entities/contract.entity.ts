import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { Expose } from 'class-transformer';

@Entity({
  name: 'contract',
})
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Expose()
  updatedAt: Date;

  @OneToMany(() => RoomEntity, (room) => room.contract)
  rooms: RoomEntity[];

  @OneToMany(() => UserEntity, (user) => user.contract)
  users: UserEntity[];
}
