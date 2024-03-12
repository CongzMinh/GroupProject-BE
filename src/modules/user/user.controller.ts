import {
  Controller,
  Get,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/shared/decoratos/get-request-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserEntity } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/configs/multer.config';
import { extname } from 'path';
import { UserService } from './user.service';


@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  // @LogExecutionTime()
  async findAll(@GetUser() user) {
    console.log('========= user : ', user);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findOne(@Request() req: any) {
    const userId = req.user.id;
    return this.userService.findOne(userId);
  }

//   @Get('uploaded/:avatarpth')
//   seeUploadedFile(@Param('avatarpth') image: string, @Res() res: any) {
//     return res.sendFile(image, { root: 'uploads/avatar' });
//   }

//   @UseGuards(JwtAuthGuard)
//   @UseInterceptors(
//     FileInterceptor('avatar', {
//       storage: storageConfig('avatar'),
//       fileFilter: (req, file, cb) => {
//         const ext = extname(file.originalname);
//         const allowedExtArr = ['.jpg', '.png', '.jpeg'];
//         if (!allowedExtArr.includes(ext)) {
//           req.fileValidationError = `Wrong extention type. Accepted file ext are: ${allowedExtArr}`;
//           cb(null, false);
//         } else {
//           const fileSize = parseInt(req.headers['content-length']);
//           if (fileSize > 1024 * 1024 * 5) {
//             req.fileValidationError = 'File size is too large';
//             cb(null, false);
//           } else {
//             cb(null, true);
//           }
//         }
//       },
//     }),
//   )
//   @Put('update-account')
//   async updateUser(
//     @Request() req: any,
//     @CurrentUser() currentUser: UserEntity,
//     @Body() updateUserDto: UpdateUserDto,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     if (req.fileValidationError) {
//       throw new BadRequestException(req.fileValidationError);
//     }
//     const id = req.user.id;
//     if (file && file.filename) {
//       // If a file is uploaded, update the avatar
//       await this.userService.updateAvatar(id, file.filename, currentUser);
//     }
//     return this.userService.updateUser(id, updateUserDto, currentUser);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Put('update/password')
//   updatePassword(
//     @Req() req,
//     @CurrentUser() currentUser: UserEntity,
//     @Body() updatePasswordDto: UpdatePasswordDto,
//   ) {
//     const id = req.user.id;
//     return this.userService.updatePassword(id, updatePasswordDto, currentUser);
//   }


//   @UseGuards(JwtAuthGuard)
//   @Delete('avatar')
//   deleteAvatar(@Req() req, @CurrentUser() currentUser: UserEntity) {
//     const id = req.user.id;
//     return this.userService.removeAvatar(id, currentUser);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
