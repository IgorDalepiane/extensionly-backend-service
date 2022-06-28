import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {
    super();
  }

  async validate(data: any): Promise<any> {
    const user = await firstValueFrom(
      this.authClient.send('validate_user', 'token'),
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
