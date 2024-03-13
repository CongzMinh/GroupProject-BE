import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,

} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import * as fs from 'fs';
import { RoomRepository } from './repositories/room.repository';
import { IssueRepository } from './repositories/issue.repository';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { DeepPartial, ILike } from 'typeorm';
import { IssueEntity } from './entities/issue.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';
import { RoomEntity } from './entities/room.entity';
import { ContractRepository } from './repositories/contract.repository';

import { PaymentRepository } from './repositories/payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Cron } from '@nestjs/schedule';
import { SearchRoomDto } from './dto/search-room.dto';


@Injectable()
export class RoomService {
  constructor(
    private roomRepo: RoomRepository,
    private issueRepo: IssueRepository,
    private userService: UserService,
    private userRepo: UserRepository,
    private contractRepo: ContractRepository,
    private paymentRepo: PaymentRepository,
  ) {}

  async getAll() {
    const rooms = await this.roomRepo.find({ relations: [ 'users']});

    if (!rooms) {
      throw new NotFoundException();
    }
    return rooms;
  }

  async getOneById(id: number) {
    const room = await this.roomRepo.findOne({
      where: { id: id },
      relations: ['users', 'contracts'],
    });

    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

// Giả sử bạn đã inject `roomRepo` vào service này qua constructor

async createRoom(request: CreateRoomDto) {
  // Kiểm tra trùng lặp title
  const existingRoom = await this.roomRepo.findOne({
    where: { title: request.title },
  });

  if (existingRoom) {
    throw new BadRequestException('Room with the same title already exists.');
  }

  // Tạo phòng mới nếu không trùng title
  const room = await this.roomRepo.create(request);
  return this.roomRepo.save(room);
}


  async createIssue(
    userId: number,
    roomId: number,
    createIssueDto: CreateIssueDto,
  ) {
    const issueData: DeepPartial<IssueEntity> = {
      ...createIssueDto,
      user: { id: userId },
      room: { id: roomId },
    };
    const issue = await this.issueRepo.create(issueData);
    return this.issueRepo.save(issue);
  }

  async addContract(createContractDto: CreateContractDto): Promise<RoomEntity> {
    const room = await this.roomRepo.findOne({
      where: { id: createContractDto.roomId },
      relations: ['users'],
    });
    if (!room) {
      throw new NotFoundException(
        `Room with id ${createContractDto.roomId} not found`,
      );
    }

    const user = await this.userService.findOne(createContractDto.userId);
    if (!user) {
      throw new NotFoundException(
        `Student with id ${createContractDto.userId} not found`,
      );
    }
    console.log(user);

    if (room.capacity <= room.users.length) {
      throw new BadRequestException('This room is full');
    }

    if (user.contract) {
      throw new BadRequestException('User already has a contract!');
    }

    const newContract = this.contractRepo.create(createContractDto);
    newContract.room = room;
    newContract.user = user;
    await this.contractRepo.save(newContract);
    user.room = room;
    user.contract = newContract;

    await this.userRepo.save(user);
    room.users.push(user);
    return this.roomRepo.save(room);
  }


  getContract(id: number) {
    return this.contractRepo.findOne({
      where: { id },
      relations: ['room', 'user'],
    });
  }

  async removeIssue(id: number) {
    const issue = await this.issueRepo.findOneBy({ id });
    return this.issueRepo.remove(issue);
  }


  async addPayment(
    createPaymentDto: CreatePaymentDto,
    roomId: number,
  ): Promise<RoomEntity> {
    const room = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: ['payments'],
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    const newPayment = this.paymentRepo.create(createPaymentDto);
    newPayment.room = room;
    newPayment.paymentDate = new Date();
    room.isPaid = true;


    await this.paymentRepo.save(newPayment);

    room.payments.push(newPayment);

    return this.roomRepo.save(room);
  }

  @Cron('0 0 1 * *')
  async updatePaymentStatusForAllRooms(): Promise<void> {
    // Get all rooms and update payment status to false
    const rooms = await this.roomRepo.find();
    rooms.forEach(async (room) => {
      room.isPaid = false;
      await this.roomRepo.save(room);
    });
  }

//  async searchRoomsByTitle(
//     searchRoomDto: SearchRoomDto,
//   ): Promise<RoomEntity[]> {
//     const { title } = searchRoomDto;
//     const titleSearchString  = title.toString();
//     console.log('Search Criteria:', { title: ILike(`%${titleSearchString}%`) });

//     return this.roomRepo.find({
//       where: { title: ILike(`%${titleSearchString}%`) },
//       order: {
//         id: 'ASC',
//       },
//     });
//   }

  async searchRoomsByTitle(searchRoomDto: SearchRoomDto): Promise<RoomEntity[]> {
    const { title } = searchRoomDto;
    const titleSearchString = title.toString();
  
    return this.roomRepo
      .createQueryBuilder("room")
      .where("CAST(room.title AS TEXT) ILIKE :title", { title: `%${titleSearchString}%` })
      .orderBy("room.id", "ASC")
      .getMany();
  }
}


