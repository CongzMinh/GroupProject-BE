import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { RoomEntity } from './room.entity';
@Entity({
  name: 'payment',
})
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  method: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Expose()
  paymentDate: Date;

  @ManyToOne(() => RoomEntity, (room) => room.payments)
  room: RoomEntity;
}
