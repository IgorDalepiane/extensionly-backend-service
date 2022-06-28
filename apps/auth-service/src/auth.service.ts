import { Injectable } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
  register(userCredentials: UserCredentialsDto) {
    console.log('REGISTRADO');
    return 'REGISTRADO';
  }

  authenticate(userCredentials: UserCredentialsDto) {
    console.log('AUTH');
    return 'AUTENTICADO';
  }

  validateUser(username: string, password: string) {
    console.log('VALIDATE');
    return 'VALIDATE';
  }
}
