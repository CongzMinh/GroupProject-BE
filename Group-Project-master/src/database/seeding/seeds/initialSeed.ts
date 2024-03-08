import { Factory, Seeder } from 'typeorm-seeding';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserEntity)().createMany(15);
  }
}
