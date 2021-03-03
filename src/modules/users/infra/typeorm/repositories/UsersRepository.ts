import { getRepository, Repository } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private sqliteRepository: Repository<User>;

  constructor() {
    this.sqliteRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.sqliteRepository.findOne({ where: { email } });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.sqliteRepository.create(data);
    await this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.sqliteRepository.save(user);
  }
}

export default UsersRepository;
