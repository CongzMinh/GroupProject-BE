import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => RoomEntity, (room) => room.contract)
  rooms: RoomEntity[];

  @OneToMany(() => UserEntity, (user) => user.contract)
  users: UserEntity[];
}
