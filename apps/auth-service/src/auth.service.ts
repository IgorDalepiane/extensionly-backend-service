import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserIdDto } from './dto/user-id.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async createToken({ userId }: UserIdDto) {
    const token = this.jwtService.sign(
      {
        userId,
      },
      {
        expiresIn: 24 * 60 * 60,
      },
    );
    await this.prisma.token.create({
      data: {
        userId,
        token,
      },
    });
    return {
      message: 'TOKEN CREATED',
      token: token,
    };
  }

  // public deleteTokenForUserId(userId: string): Query<any, any> {
  //   return this.tokenModel.remove({
  //     user_id: userId,
  //   });
  // }

  // public async decodeToken(token: string) {
  //   const tokenModel = await this.tokenModel.find({
  //     token,
  //   });
  //   let result = null;

  //   if (tokenModel && tokenModel[0]) {
  //     try {
  //       const tokenData = this.jwtService.decode(tokenModel[0].token) as {
  //         exp: number;
  //         userId: any;
  //       };
  //       if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
  //         result = null;
  //       } else {
  //         result = {
  //           userId: tokenData.userId,
  //         };
  //       }
  //     } catch (e) {
  //       result = null;
  //     }
  //   }
  //   return result;
  // }

  authenticate(userCredentials: UserCredentialsDto) {
    console.log('AUTH');
    return 'AUTENTICADO';
  }

  validateUser(username: string, password: string) {
    console.log('VALIDATE');
    return 'VALIDATE';
  }
}
