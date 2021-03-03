import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import CreateUserService from "@modules/users/services/CreateUserService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to create a new user with the provided name, email and password.", async () => {
    const userData = {
      name: "Ogrim Doomhammer",
      email: "doomhammer@blizzard.com",
      password: "thrall",
    };

    const user = await createUser.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });

  it("should not be able to create a user when a user with the provided email already exists.", async () => {
    const userData = {
      name: "Ogrim Doomhammer",
      email: "doomhammer@blizzard.com",
      password: "thrall",
    };

    await fakeUsersRepository.create(userData);

    await expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to hash the user's provided password.", async () => {
    const generateHash = jest.spyOn(fakeHashProvider, "generate");

    const userData = {
      name: "Ogrim Doomhammer",
      email: "doomhammer@blizzard.com",
      password: "thrall",
    };

    await createUser.execute(userData);

    expect(generateHash).toHaveBeenCalledTimes(1);
    expect(generateHash).toHaveBeenCalledWith('thrall');
    expect(generateHash).toHaveReturnedTimes(1);
  });
});
