import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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

@Controller('post')
@ApiTags('Posts')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: storageConfig('image'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtArr}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = 'File size is too large';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  createPost(
    @Request() req: any,
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() file: Express.Multer.File[],
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const filepaths = file.map((file) => file.filename);
    return this.postService.createPost(createPostDto, filepaths, currentUser);
  }

  @Get()
  findAll(@CurrentUser() currentUser: UserEntity) {
    return this.postService.getAll(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() currentUser: UserEntity) {
    return this.postService.getOneById(id, currentUser);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: storageConfig('image'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtArr}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = 'File size is too large';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Request() req: any,
    @Param('id') id: number,
    @CurrentUser() currentUser: UserEntity,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const filepaths = file.map((file) => file.filename);
    return this.postService.updateById(
      id,
      currentUser,
      updatePostDto,
      filepaths,
    );
  }

  @Delete(':id')
  deletePost(@Param('id') id: number, @CurrentUser() currentUser: UserEntity) {
    return this.postService.delete(id, currentUser);
  }
}
