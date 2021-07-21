import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ParamDto {
  @ApiProperty({
    description: 'Id of either a user or a message',
    type: Number,
    required: true,
    nullable: false,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
