import type { Livro } from '@prisma/client';

export class LivroResponse {
  id: number;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;

  static fromLivroEntity(entity: Livro): LivroResponse {
    const response = new LivroResponse();
    response.id = entity.id;
    response.title = entity.title;
    response.content = entity.content;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;

    return response;
  }
}
