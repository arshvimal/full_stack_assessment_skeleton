import { IsInt, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class UpdateUsersDto {
  @IsInt()
  homeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  userIds: number[];
}
