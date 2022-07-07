import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginCredentialsDto, LoginUserResponseDto } from './dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  @Put('login')
  async login(
    @Body() body: LoginCredentialsDto,
  ): Promise<LoginUserResponseDto> {
    return this.userService.login(body);
  }

  // @Post('register')
  // register(@Body() body: AuthenticateDto) {
  //   return this.authService.register(body);
  // }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('validate_user');
    this.authClient.subscribeToResponseOf('create_token');
    this.userClient.subscribeToResponseOf('user_search_by_credentials');
    await this.authClient.connect();
    await this.userClient.connect();
  }
}
