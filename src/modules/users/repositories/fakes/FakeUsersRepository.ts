import { v4 as uuid } from "uuid";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

import User from "@modules/users/infra/typeorm/entities/User";

class FakeUsersRepository implements IUsersRepository {
  private users: Array<User> = [];

  public async create(data: ICreateUserDTO): Promise<User> {

    const user = new User();
    Object.assign(user, {
      id: uuid(),
      name: data.name,
      email: data.email,
      password: data.password,
    } as User);

    this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if (userIndex !== -1) {
      this.users[userIndex] = user;
    }
    if (userIndex === -1) {
      this.users.push(user);
    }

    return user;
  }
}

export default FakeUsersRepository;
