import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLivroDto {
  @ApiProperty({
    description: '登录账号',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '登录密码',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '用户昵称',
  })
  @IsNotEmpty()
  authorId: number;
}
