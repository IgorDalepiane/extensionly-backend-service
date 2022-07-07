import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { LoginCredentialsDto, LoginUserResponseDto } from './dto';
import { TokenCreationResponseDto } from './dto/token-creation-response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  // register(userCredentials: UserCredentialsDto) {
  //   this.authClient
  //     .send('register', 'userCredentials')
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  async login(data: LoginCredentialsDto): Promise<LoginUserResponseDto> {
    const getUserResponse = await firstValueFrom(
      this.userClient.send('user_search_by_credentials', data),
    );
    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const createTokenResponse: TokenCreationResponseDto = await firstValueFrom(
      this.authClient.send('create_token', {
        userId: getUserResponse.user.id,
      }),
    );

    return {
      message: createTokenResponse.message,
      data: {
        token: createTokenResponse.token,
      },
      errors: null,
    };
  }
}
