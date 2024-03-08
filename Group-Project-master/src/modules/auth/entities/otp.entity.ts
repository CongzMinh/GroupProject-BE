import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'otp',
})
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  otp: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  expiredAt: Date;

  isExpired(): boolean {
    return this.expiredAt && this.expiredAt < new Date();
  }
}
