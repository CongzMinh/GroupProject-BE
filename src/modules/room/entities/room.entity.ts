import { Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IssueEntity } from './issue.entity';
import { ContractEntity } from './contract.entity';

@Entity({
  name: 'rooms',
})
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  area: number;

  @Column()
  price: number;

  @Column()
  deadline: number;

  @Column()
  floor: number;

  @Column()
  status: string;

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

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @Expose()
  deletedAt?: Date;

  @OneToMany(() => UserEntity, (user) => user.room)
  @Transform(({ obj }) => obj.user.id)
  users: UserEntity[];

  @OneToMany(() => IssueEntity, (issue) => issue.room)
  issues: IssueEntity[];

  @ManyToOne(() => ContractEntity, (contract) => contract.rooms)
  contract: ContractEntity;
}
