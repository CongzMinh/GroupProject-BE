import { define } from 'typeorm-seeding';
import { UserEntity } from 'src/modules/user/entities/user.entity';
/* tslint:disable no-var-requires */
const Faker = require('Faker');

define(UserEntity, (faker: typeof Faker) => {
  const user = new UserEntity();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.name = `${firstName} ${lastName}`;
  return user;
});
