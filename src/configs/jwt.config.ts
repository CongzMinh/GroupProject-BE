import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecretKey,
      signOptions: { expiresIn: '1d' },
    };
  },
};
