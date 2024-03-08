import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Role } from 'src/shared/enums/role.enum';
@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>,
  ) {}

  async seed() {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        phonenumber: faker.phone.number(),
        password: 'sl!c0nn3ct2023',
        role: Role.USER,
      });
    }
    // console.log("========= users : ",users);
    return this.usersRepo.save(users);
  }
}
