import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { Public } from '../../commons/guards/jwt-auth.guard';
import { ValidationPipe } from '../../commons/pipes/validation.pipe';
import { AccessKeyInterceptor } from '../../commons/interceptors/AccessKeyInterceptor';

@Controller('auth')
@UseInterceptors(AccessKeyInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
