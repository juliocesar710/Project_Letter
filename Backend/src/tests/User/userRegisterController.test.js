import { jest } from "@jest/globals";

jest.unstable_mockModule(
  "../../repositories/User/userRegisterRepository.js",
  () => ({
    createUserRepository: jest.fn(),
  })
);

const { createUserService } = await import(
  "../../services/User/userRegisterService.js"
);
const { createUserRepository } = await import(
  "../../repositories/User/userRegisterRepository.js"
);

describe("Testing createUserService", () => {
  it("must create a user with valid data", async () => {
    const mockUserData = {
      name: "Julio",
      email: "julio@email.com",
      password: "123456",
    };

    const mockUserResponse = {
      id: 1,
      ...mockUserData,
    };

    createUserRepository.mockResolvedValue(mockUserResponse);

    const result = await createUserService(mockUserData);

    expect(createUserRepository).toHaveBeenCalledWith(mockUserData);
    expect(result).toEqual(mockUserResponse);
  });

  it("should throw error if any field is empty", async () => {
    const mockUserData = {
      name: "",
      email: "",
      password: "",
    };

    await expect(createUserService(mockUserData)).rejects.toThrow(
      "Nothing fieds should be empty"
    );
  });

  it("should throw error if password is short", async () => {
    const mockUserData = {
      name: "Julio",
      email: "julio@email.com",
      password: "123",
    };

    await expect(createUserService(mockUserData)).rejects.toThrow(
      "Password should be at least 6 characters long"
    );
  });
});
