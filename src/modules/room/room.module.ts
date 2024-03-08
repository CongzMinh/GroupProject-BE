import { Module } from '@nestjs/common';
import { PostService } from './room.service';
import { PostController } from './room.controller';
import { RoomRepository } from './repositories/room.repository';
import { RolesGuard } from '../auth/roles.guard';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  providers: [PostService, UserRepository, RoomRepository, RolesGuard],
  controllers: [PostController],
})
export class PostModule {}
