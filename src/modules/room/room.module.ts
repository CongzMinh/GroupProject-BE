import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { PostController } from './room.controller';
import { RoomRepository } from './repositories/room.repository';
import { RolesGuard } from '../auth/roles.guard';
import { UserRepository } from '../user/repositories/user.repository';
import { IssueRepository } from './repositories/issue.repository';
import { ContractRepository } from './repositories/contract.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { UserService } from '../user/user.service';

@Module({
  providers: [
    RoomService,
    UserService,
    UserRepository,
    RoomRepository,
    RolesGuard,
    IssueRepository,
    ContractRepository,
    PaymentRepository,
  ],
  controllers: [PostController],
})
export class RoomModule {}
