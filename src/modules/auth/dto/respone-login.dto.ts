import { PartialType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class ResponseLogin extends PartialType(UserEntity) {
  accessToken: string;
  refreshToken: string;
}
