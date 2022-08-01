import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from 'core/controllers/base.controller';
import { AuthService } from './auth.service';
import { LoginReqDto, RegisterReqDto } from './dto/request';

@Controller('api/auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/login')
  async login(@Body() reqDto: LoginReqDto) {
    const result = await this.authService.login(reqDto);
    
    return this.successResponse({data: result})
  }

  @Post('/register')
  async register(@Body() reqDto: RegisterReqDto) {
    await this.authService.register(reqDto);

    return this.successResponse();
  }
}
