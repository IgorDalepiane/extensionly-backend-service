import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('create_token')
  async createToken(data: any) {
    return this.authService.createToken(data.value);
  }

  @MessagePattern('authenticate')
  authenticate(@Payload() data: any) {
    return this.authService.authenticate(data.value);
  }

  @MessagePattern('validate_user')
  validateUser(@Payload() data: any) {
    return this.authService.validateUser(data.value, '1');
  }
}
