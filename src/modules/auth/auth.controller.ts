import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgotPassDto } from './dto/forgotPass.dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('register')
  signUp(@Body() request: CreateUserDto) {
    return this.authService.register(request);
  }

  @Post('email/validate-otp')
  validateOtp(@Body() forgotPassDto: ForgotPassDto) {
    return this.authService.validateOtp(forgotPassDto);
  }

  @Post('email/forgot-password')
  forgotPasswordByEmail(@Body('email') email: string) {
    return this.authService.sendEmailOtp(email);
  }

  @Put('reset-password/:email')
  resetPassword(
    @Param('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.resetPassword(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
