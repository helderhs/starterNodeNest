import type { User, UserRole } from '@prisma/client';

export class UserResponse {
  id: number;
  username: string;
  password?: string;
  nickname: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;
    response.username = entity.username;
    response.password = entity.password;
    response.nickname = entity.nickname;
    response.role = entity.role;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;

    return response;
  }
}
