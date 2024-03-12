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
  Post,
  Query,
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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';


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



  @UseGuards(JwtAuthGuard)
  @Post('search')
  searchUser(
    @Body() searchUserDto: SearchUserDto
    ): Promise<UserEntity[]> {
    return this.userService.searchUser(searchUserDto);
  }




  
  @UseGuards(JwtAuthGuard)
  @Put('update-account')
  async updateUser(
    @Req() req: any,
    @CurrentUser() currentUser: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = req.user.id;
    return this.userService.updateUser(id, updateUserDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/password')
  updatePassword(
    @Req() req,
    @CurrentUser() currentUser: UserEntity,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const id = req.user.id;
    return this.userService.updatePassword(id, updatePasswordDto, currentUser);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
