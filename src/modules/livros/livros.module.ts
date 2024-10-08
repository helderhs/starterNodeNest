import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';

@Module({
  imports: [],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
