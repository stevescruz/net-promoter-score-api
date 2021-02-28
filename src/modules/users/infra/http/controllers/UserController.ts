import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    console.log(name, email, password);

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.status(201).json(user);
  }
}

export default UserController;
