import { Module } from '@nestjs/common';
<<<<<<< HEAD
// import { PostService } from './room.service';
=======
import { PostService } from './room.service';
>>>>>>> main
import { PostController } from './room.controller';
import { RoomRepository } from './repositories/room.repository';
import { RolesGuard } from '../auth/roles.guard';
import { UserRepository } from '../user/repositories/user.repository';
<<<<<<< HEAD
import { RoomService } from './room.service';

@Module({
  providers: [RoomService, UserRepository, RoomRepository, RolesGuard],
  controllers: [PostController],
})
export class RoomModule {}
=======

@Module({
  providers: [PostService, UserRepository, RoomRepository, RolesGuard],
  controllers: [PostController],
})
export class PostModule {}
>>>>>>> main
