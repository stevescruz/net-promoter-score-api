import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

import User from "@modules/users/infra/typeorm/entities/User";

import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const userExists = !!(await this.usersRepository.findByEmail(email));

    if (userExists) {
      throw new AppError("A user with the provided email already exists.", 400);
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
