import { HttpStatus, Injectable } from '@nestjs/common';
import { SearchParamsDto } from './interface/search-params.dto';
import { IUserSearchResponse } from './interface/user-search-response.interface';
import { User } from './interface/user.interface';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async searchByCredentials(searchParams: SearchParamsDto) {
    let result: IUserSearchResponse;
    if (searchParams.email && searchParams.password) {
      const user = await this.prisma.user.findUnique({
        where: {
          email: searchParams.email,
        },
      });

      if (user) {
        if (
          bcrypt.compare(
            searchParams.password,
            await bcrypt.hash(user.password, 10),
          )
        ) {
          result = {
            status: HttpStatus.OK,
            message: 'user_search_by_credentials_success',
            user: user,
          };
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_search_by_credentials_not_match',
            user: null,
          };
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }
    console.log(result);
    return result;
  }

  async searchUser(params: { email: string }): Promise<User[]> {
    return [];
    // return this.userModel.find(params).exec();
  }
}
