import { Controller, Get } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('throttler')
@ApiTags('Throttler Example')
@ApiBearerAuth()
// skill check rate limit this controller
@SkipThrottle()
export class ThrottlerController {
  // Rate limiting is applied to this route.
  @SkipThrottle(false)
  @Get('/dontSkipAPI')
  dontSkipAPI() {
    return 'List users work with Rate limiting.';
  }

  // This route will skip rate limiting.
  @Get('/doSkipAPI')
  doSkipAPI() {
    return 'List users work without Rate limiting.';
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle(1, 1)
  @Get('/custom')
  findAll() {
    return 'List users works with custom rate limiting.';
  }
}
