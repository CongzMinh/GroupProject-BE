import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
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


}
