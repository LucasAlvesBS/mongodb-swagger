import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginSwagger } from './swagger/login.swagger';
import { UserLoggedSwagger } from './swagger/user-logged.swagger';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: UserLoggedSwagger,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Authentication failed',
  })
  @ApiBody({
    description: 'Credentials needed to login',
    required: true,
    type: LoginSwagger,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
