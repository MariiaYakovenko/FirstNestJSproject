import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class SenderAndReceiverDto {
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
