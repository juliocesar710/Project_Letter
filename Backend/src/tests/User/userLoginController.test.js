import { describe, it, jest } from "@jest/globals";

jest.unstable_mockModule(
  "../../repositories/User/userLoginRepository.js",
  () => ({
    findUserByEmailRepository: jest.fn(),
  })
);

jest.unstable_mockModule("bcrypt", () => ({
  compare: jest.fn(),
}));

const { findUser } = await import("../../services/User/userLoginService.js");
const { findUserByEmailRepository } = await import(
  "../../repositories/User/userLoginRepository.js"
);
const bcrypt = await import("bcrypt");

describe("Testing findUser", () => {
  it("deve retornar o usuário com email e senha válidos", async () => {
    const userData = {
      email: "julio@email.com",
      password: "123456",
    };

    const mockUser = {
      id: 1,
      email: userData.email,
      password: "hashedPasswordAqui",
    };

    findUserByEmailRepository.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const result = await findUser(userData);
    expect(findUserByEmailRepository).toHaveBeenCalledWith(userData.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      userData.password,
      mockUser.password
    );
    expect(result).toEqual(mockUser);
  });

  it("deve lançar erro se email ou senha estiverem vazios", async () => {
    const userData = {
      email: "",
      password: "",
    };

    await expect(findUser(userData)).rejects.toThrow(
      "Email and password are required"
    );
  });

  it("deve lançar erro se o usuário não for encontrado", async () => {
    const userData = {
      email: "inexistente@email.com",
      password: "qualquer",
    };

    findUserByEmailRepository.mockResolvedValue(null);

    await expect(findUser(userData)).rejects.toThrow("User not found the here");
  });

  it("deve lançar erro se a senha estiver incorreta", async () => {
    const userData = {
      email: "julio@email.com",
      password: "senhaerrada",
    };

    const mockUser = {
      id: 1,
      email: userData.email,
      password: "hashCorretoAqui",
    };

    findUserByEmailRepository.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(findUser(userData)).rejects.toThrow("Invalid password");
  });
});
