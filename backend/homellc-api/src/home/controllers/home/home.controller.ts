import { Controller, Get, Put, Param, Query, Body } from '@nestjs/common';
import { UpdateUsersDto } from 'src/dto/update-users.dto';
import { HomeService } from 'src/home/service/home/home.service';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('find-by-user/:userId')
  findByUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 50,
  ) {
    return this.homeService.findByUser(userId, page, pageSize);
  }

  @Put('update-users')
  updateUsers(@Body() updateUsersDto: UpdateUsersDto) {
    return this.homeService.updateUsers(
      updateUsersDto.homeId,
      updateUsersDto.userIds,
    );
  }
}
