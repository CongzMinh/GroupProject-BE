import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import * as fs from "fs";
import { RoomRepository } from "./repositories/room.repository";
import { IssueRepository } from "./repositories/issue.repository";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { CreateRoomDto } from "./dto/create-room.dto";
import { DeepPartial } from "typeorm";
import { IssueEntity } from "./entities/issue.entity";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UserRepository } from "../user/repositories/user.repository";
import { UserService } from "../user/user.service";
import { RoomEntity } from "./entities/room.entity";
import { ContractRepository } from "./repositories/contract.repository";

@Injectable()
export class RoomService {
  constructor(
    private roomRepo: RoomRepository,
    private issueRepo: IssueRepository,
    private userService: UserService,
    private contractRepo: ContractRepository,
  ) {}

  async getAll() {
    const rooms = await this.roomRepo.find();

    if (!rooms) {
      throw new NotFoundException();
    }
    return rooms;
  }

  async getOneById(id: number) {
    const room = await this.roomRepo.findOne({
      where: { id: id },
      relations: ['users'],
    });

    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  async createRoom(request: CreateRoomDto) {
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
      user: { id: userId }, // Assuming user is a relation in your IssueEntity
      room: { id: roomId }, // Assuming room is a relation in your IssueEntity
    };
    const issue = await this.issueRepo.create(issueData);
    return this.issueRepo.save(issue);
  }

  async addContract(createContractDto: CreateContractDto): Promise<RoomEntity> {
    const room = await this.roomRepo.findOne({
      where: { id: createContractDto.roomId },
      relations: ["users"],
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

    const newContract = this.contractRepo.create(createContractDto);
    await this.contractRepo.save(newContract);

    room.users.push(user);
    return this.roomRepo.save(room);
  }
}
