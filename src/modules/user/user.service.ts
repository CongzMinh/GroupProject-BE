// import {
//   BadRequestException,
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserEntity } from './entities/user.entity';
// import { UserRepository } from './repositories/user.repository';
// import { UpdatePasswordDto } from './dto/update-password.dto';
// import * as bcrypt from 'bcrypt';
// import * as fs from 'fs';

// @Injectable()
// export class UserService {
//   constructor(private userRepo: UserRepository) {}

//   createUser(createUserDto: CreateUserDto) {
//     const createdUser = this.userRepo.create(createUserDto);
//     return this.userRepo.save(createdUser);
//   }

//   findAll() {
//     return this.userRepo.find();
//   }

//   findOne(id: number) {
//     return this.userRepo.findOneBy({ id });
//   }

//   findByEmail(email: string) {
//     return this.userRepo.findOne({
//       where: {
//         email,
//       },
//     });
//   }

//   findByPhoneNumber(phoneNumber: string) {
//     return this.userRepo.findOne({
//       where: {
//         phoneNumber,
//       },
//     });
//   }

//   async updateUser(
//     id: number,
//     updateUserDto: UpdateUserDto,
//     currentUser: UserEntity,
//   ) {
//     const user = await this.findOne(id);
//     if (!user) {
//       throw new NotFoundException('User does not exist');
//     }
  
//     if (id !== currentUser.id) {
//       throw new ForbiddenException('You do not have permission');
//     }

//     user.name = updateUserDto.name;
//     user.email = updateUserDto.email;
//     user.phoneNumber = updateUserDto.phoneNumber;

//     return this.userRepo.save(user);
//   }

//   async updateAvatar(id: number, avatar: string, currentUser: UserEntity) {
//     const user = await this.findOne(id);
//     if (!user) {
//       throw new NotFoundException('User does not exist');
//     }
    
//     if (id !== currentUser.id) {
//       throw new ForbiddenException('You do not have permission');
//     }
    
//     try {
//       // Check and delete the existing avatar if it exists
//       if (user.avatar && fs.existsSync(user.avatar)) {
//         fs.unlinkSync(user.avatar);
//       }
//     } catch (error) {
//       console.error('Error deleting avatar:', error);
//       // Handle the error or log it appropriately
//     }
//     // Update avatar only if provided
//     if (avatar) {
//       user.avatar = avatar;
//     } else {
//       user.avatar = user.avatar;
//     }
//     return this.userRepo.save(user);
//   }
  
//   async updatePassword(
//     id: number,
//     updatePasswordDto: UpdatePasswordDto,
//     currentUser: UserEntity,
//   ) {
//     const user = await this.findOne(id);
//     if (!user) {
//       throw new NotFoundException('User does not exist');
//     }

//     const isMatchPassword = await bcrypt.compare(
//       updatePasswordDto.oldPassword,
//       user.password,
//     );

//     console.log(isMatchPassword);
//     console.log(id + '============' + currentUser.id);
//     if (id !== currentUser.id || !isMatchPassword) {
//       throw new ForbiddenException();
//     }
//     const salt = await bcrypt.genSalt(+process.env.APP_BCRYPT_SALT);
//     user.password = await bcrypt.hash(updatePasswordDto.newPassword, salt);
//     return this.userRepo.save(user);
//   }

//   async removeAvatar(id: number, currentUser: UserEntity) {
//     const user = await this.findOne(id);

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     console.log(currentUser);

//     if (id != currentUser.id) {
//       throw new ForbiddenException();
//     }

//     if (user.avatar) {
//       fs.unlinkSync(user.avatar);

//       user.avatar = null;

//       return this.userRepo.save(user);
//     }
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
