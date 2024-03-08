import { Module } from '@nestjs/common';
import { ThrottlerController } from './throttler.controller';

@Module({
  controllers: [ThrottlerController],
})
export class ThrottlerExampleModule {}
