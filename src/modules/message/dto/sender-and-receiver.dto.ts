import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { PaginationQueryParamsDto } from '../../../shared/dto/pagination-query-params.dto';

export class SenderAndReceiverDto extends PaginationQueryParamsDto {
  @ApiProperty({
    description: 'Id of a sender',
    type: Number,
    required: true,
    nullable: false,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  sender_id: number;

  @ApiProperty({
    description: 'Id of a receiver',
    type: Number,
    required: true,
    nullable: false,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  receiver_id: number;
}
