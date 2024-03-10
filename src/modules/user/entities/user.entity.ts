import { Expose } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/enums/role.enum';
import { RoomEntity } from 'src/modules/room/entities/room.entity';
import { IssueEntity } from 'src/modules/room/entities/issue.entity';
import { Gender } from 'src/shared/enums/gender.enum';
import { ContractEntity } from 'src/modules/room/entities/contract.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column()
  @Expose()
  name?: string;

  @Column({ nullable: true, default: null })
  @Expose()
  email: string;

  @Column({
    length: 200,
    nullable: true,
    default: null,
  })
  @Expose()
  phoneNumber?: string;

  @Column()
  DoB: string;

  @Column()
  Student_ID: string;

  @Column({
  nullable: true,
  })
  @Expose()
  password: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  year_start: number;

  @Column()
  year_graduated: number;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @Expose()
  role: Role;

  @Column({
    name: 'is_locked',
    default: false,
  })

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


  @ManyToOne(() => RoomEntity, (room) => room.users)
  room: RoomEntity;

  @OneToMany(() => IssueEntity, (issue) => issue.user)
  issues: IssueEntity[];

  @ManyToOne(() => ContractEntity, (contract) => contract.users)
  contract: ContractEntity;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(+process.env.APP_BCRYPT_SALT);
    console.log('========= before insert');
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}