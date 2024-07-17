import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ListOrder } from '../../commons/constants/list';
import { encrypt } from '@utils/encrypt';
import { IPagination } from 'src/types/global';
import { Prisma } from '@prisma/client';
import { EventsGateway } from '@gateways/events.gateway';
import { CreateLivroDto, UpdateLivroDto } from './dto';
import { RedisService } from '@database/redis.service';
import { UserResponse } from '@modules/users/response/user.response';
import { LivroResponse } from '@modules/livros/response/livro.response';
import { TestIntegrationService } from '../../integrations/test/test.service';

const USER_SELECT = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  nickname: true,
  role: true,
  password: true,
  createdAt: true,
  updatedAt: true,
});

@Injectable()
export class LivrosService {
  constructor(
    private testIntegration: TestIntegrationService,
    private databaseService: DatabaseService,
    private eventsGateway: EventsGateway,
    private redisService: RedisService,
  ) {}

  async createLivro(data: CreateLivroDto) {
    const res = await this.databaseService.livro.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
      // select: USER_SELECT,
    });
    //**********
    // pode usar o response, ou usar o USER_SELECT para selecionar o que retorna
    // return LivroResponse.fromUserEntity(res);
    return res;
  }

  async getLivros(pagination: IPagination, keyword: string) {
    const [items, total] = await this.databaseService.$transaction([
      this.databaseService.livro.findMany({
        where: {
          title: {
            contains: keyword,
          },
        },
        orderBy: {
          updatedAt: ListOrder.Desc,
        },
        // select: USER_SELECT,
        take: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
      }),
      this.databaseService.livro.count({
        where: {
          title: {
            contains: keyword,
          },
        },
      }),
    ]);
    return {
      items,
      total,
    };
  }

  async getLivro(id: number) {
    const livro = await this.databaseService.livro.findUnique({
      where: {
        id,
      },
      // select: USER_SELECT,
    });
    if (!livro) {
      throw new HttpException(`Livro which id is '${id}' was not found`, HttpStatus.NOT_FOUND);
    }
    const testIntegration = await this.testIntegration.getData();
    console.log(testIntegration.data);
    return livro;
  }

  async updateLivro(id: number, data: UpdateLivroDto) {
    const oldUser = await this.getLivro(id);
    const newUser: UpdateLivroDto = {
      title: data.title || oldUser.title,
      content: data.content || oldUser.content,
    };

    return await this.databaseService.livro.update({
      where: {
        id,
      },
      data: newUser,
      // select: USER_SELECT,
    });
  }

  async removeLivro(id: number) {
    await this.redisService.removeAuthToken(id);
    await this.databaseService.livro.delete({
      where: {
        id,
      },
    });
    return 'ok';
  }
}
