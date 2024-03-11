import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/configs/multer.config';
import { extname } from 'path';
import { Roles } from 'src/shared/decoratos/role.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { SearchRoomDto } from './dto/search-room.dto';
import { RoomEntity } from './entities/room.entity';
import { response } from 'express';

@Controller('room')
@ApiTags('Rooms')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(RolesGuard)
// @Roles(Role.ADMIN)
export class PostController {
  constructor(private roomService: RoomService) {}

  // @Post('create')
  // @UseInterceptors(
  //   FilesInterceptor('image', 10, {
  //     storage: storageConfig('image'),
  //     fileFilter: (req, file, cb) => {
  //       const ext = extname(file.originalname);
  //       const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  //       if (!allowedExtArr.includes(ext)) {
  //         req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtArr}`;
  //         cb(null, false);
  //       } else {
  //         const fileSize = parseInt(req.headers['content-length']);
  //         if (fileSize > 1024 * 1024 * 5) {
  //           req.fileValidationError = 'File size is too large';
  //           cb(null, false);
  //         } else {
  //           cb(null, true);
  //         }
  //       }
  //     },
  //   }),
  // )
  // createPost(
  //   @Request() req: any,
  //   @Body() createPostDto: CreatePostDto,
  //   @UploadedFiles() file: Express.Multer.File[],
  //   @CurrentUser() currentUser: UserEntity,
  // ) {
  //   if (req.fileValidationError) {
  //     throw new BadRequestException(req.fileValidationError);
  //   }
  //   const filepaths = file.map((file) => file.filename);
  //   return this.postService.createPost(createPostDto, filepaths, currentUser);
  // }

  @Get()
  findAll() {
    return this.roomService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.getOneById(id);
  }


  @Get('contract/:id')
  getContract(@Param('id') id: number) {
    return this.roomService.getContract(id);
  }

  @Post('search')
  searchRoomsByTitle(
    @Body() searchRoomDto: SearchRoomDto,
  ): Promise<RoomEntity[]> {
    return this.roomService.searchRoomsByTitle(searchRoomDto);

  }

  // @Put(':id')
  // @UseInterceptors(
  //   FilesInterceptor('image', 10, {
  //     storage: storageConfig('image'),
  //     fileFilter: (req, file, cb) => {
  //       const ext = extname(file.originalname);
  //       const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  //       if (!allowedExtArr.includes(ext)) {
  //         req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtArr}`;
  //         cb(null, false);
  //       } else {
  //         const fileSize = parseInt(req.headers['content-length']);
  //         if (fileSize > 1024 * 1024 * 5) {
  //           req.fileValidationError = 'File size is too large';
  //           cb(null, false);
  //         } else {
  //           cb(null, true);
  //         }
  //       }
  //     },
  //   }),
  // )
  // update(
  //   @Request() req: any,
  //   @Param('id') id: number,
  //   @CurrentUser() currentUser: UserEntity,
  //   @Body() updatePostDto: UpdatePostDto,
  //   @UploadedFiles() file: Express.Multer.File[],
  // ) {
  //   if (req.fileValidationError) {
  //     throw new BadRequestException(req.fileValidationError);
  //   }
  //   const filepaths = file.map((file) => file.filename);
  //   return this.postService.updateById(
  //     id,
  //     currentUser,
  //     updatePostDto,
  //     filepaths,
  //   );
  // }

  // @Delete(':id')
  // deletePost(@Param('id') id: number, @CurrentUser() currentUser: UserEntity) {
  //   return this.postService.delete(id, currentUser);
  // }

  @Post('create')
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    try {
      return await this.roomService.createRoom(createRoomDto);
    } catch (error) {
      // Xử lý và trả về lỗi phù hợp
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
  

  @UseGuards(JwtAuthGuard)
  @Post('create-issue/:roomId')
  async createIssue(
    @Request() req: any,
    @Param('roomId') roomId: number,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    const userId = req.user.id;
    return this.roomService.createIssue(userId, roomId, createIssueDto);
  }

  @Post('create-contract')
  async createContract(@Body() createContractDto: CreateContractDto) {
    return this.roomService.addContract(createContractDto);
  }

  @Delete('issue/:id')
  removeIssue(@Param('id') issueId: number) {
    return this.roomService.removeIssue(issueId);
  }
}
