import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt, IsOptional, IsPositive, Min,
} from 'class-validator';

export class PaginationQueryParamsDto {
  @ApiProperty({
    description: 'Count items per page',
    example: 10,
    default: 10,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  per_page: number = 10;

  @ApiProperty({
    description: 'page to return',
    example: 1,
    default: 1,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  page: number = 1;
}
