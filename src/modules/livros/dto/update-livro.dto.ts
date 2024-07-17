import { ApiProperty } from '@nestjs/swagger';

export class UpdateLivroDto {
  @ApiProperty({
    description: '用户昵称',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: '登录密码',
    required: false,
  })
  content?: string;
}
