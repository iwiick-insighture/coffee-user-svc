import { AuthenticatedUser } from "../common/authenticated-user.dto";
import { dataSource } from "../configs/db";
import { User } from "../entities/user.entity";
import { decrypt, encrypt } from "../utils/crypto";
const coffeeRepo = dataSource.getRepository(User);

export const addUser = async (newUser: User): Promise<User> => {
  const encryptedUser = {
    ...newUser,
    password: encrypt(newUser.password),
  } as User;
  const coffee = new User(encryptedUser);
  await coffeeRepo.save(coffee);
  return coffee;
};

export const authenticate = async (user: User): Promise<AuthenticatedUser> => {
  const currentUser = await coffeeRepo.findOneBy({ email: user.email });
  if (currentUser && decrypt(currentUser.password) == user.password) {
    return {
      isAuthenticated: true,
      name: currentUser.name,
      email: currentUser.email,
      userId: currentUser.id,
    };
  }
  return {
    isAuthenticated: false,
    email: user.email,
  };
};

export const doesUserExist = async (email: string): Promise<boolean> => {
  const currentUser = await coffeeRepo.findOneBy({ email });
  return !!currentUser;
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await coffeeRepo.findOneBy({ id });
};

export const updateUserById = async (
  id: string,
  newUser: User
): Promise<User | null> => {
  await coffeeRepo.update(id, newUser);
  return newUser;
};

export const deleteUserById = async (id: string): Promise<string> => {
  await coffeeRepo.delete(id);
  return id;
};
