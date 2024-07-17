import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe, HttpCode } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto, UpdateLivroDto } from './dto';
import { ValidationPipe } from '../../commons/pipes/validation.pipe';
import { IsAdmin } from '../../commons/guards/role-auth.guard';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @IsAdmin()
  @Post()
  createLivro(@Body(new ValidationPipe()) createLivroDto: CreateLivroDto) {
    return this.livrosService.createLivro(createLivroDto);
  }

  @IsAdmin()
  @Get()
  async getLivros(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('keyword', new DefaultValuePipe('')) keyword: string,
  ) {
    return this.livrosService.getLivros({ page, pageSize }, keyword);
  }

  @IsAdmin()
  @Get(':id')
  async getLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.getLivro(id);
  }

  @IsAdmin()
  @Patch(':id')
  updateLivro(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateLivroDto: UpdateLivroDto) {
    return this.livrosService.updateLivro(id, updateLivroDto);
  }

  @IsAdmin()
  @Delete(':id')
  @HttpCode(204)
  async removeLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.removeLivro(id);
  }
}
