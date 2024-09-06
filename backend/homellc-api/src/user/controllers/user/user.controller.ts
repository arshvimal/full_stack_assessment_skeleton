import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('find-all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-by-home/:homeId')
  findByHome(@Param('homeId') homeId: number) {
    return this.userService.findByHome(homeId);
  }
}
