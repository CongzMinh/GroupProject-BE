import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import * as fs from 'fs';
import { RoomRepository } from './repositories/room.repository';
import { IssueRepository } from './repositories/issue.repository';

@Injectable()
export class RoomService {
  // constructor(
  //   private roomRepo: RoomRepository,
  //   private issueRepo: IssueRepository,) {}

  // async getAll() {
  //   const rooms = await this.roomRepo.find();

  //   if (!rooms) {
  //     throw new NotFoundException();
  //   }
  //   return rooms;
  // }

  // async getOneById(id: number) {
  //   const room = await this.roomRepo.findOne({
  //     where: { id: id },
  //     relations: ['user'],
  //   });

  //   if (!room) {
  //     throw new NotFoundException();
  //   }
  //   return room;
  // }

  // async createIssue(userId: number, )
}
