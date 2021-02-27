import { getRepository, Repository } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository {
  private sqliteRepository: Repository<User>;

  constructor() {
    this.sqliteRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.sqliteRepository.create(data);
    await this.sqliteRepository.save(user);

    return user;
  }
}

export default UsersRepository;
