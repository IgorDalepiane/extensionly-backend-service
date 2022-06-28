import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchParamsDto } from './interface/search-params.dto';
import { IUserSearchResponse } from './interface/user-search-response.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_search_by_credentials')
  async searchUserByCredentials(
    @Payload() data: any,
  ): Promise<IUserSearchResponse> {
    return await this.userService.searchByCredentials(data.value);
  }
}
