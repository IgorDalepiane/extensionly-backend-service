import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('.internal')
export class AppController {
  @Get('ping')
  ping() {
    return HttpStatus.OK;
  }
}
