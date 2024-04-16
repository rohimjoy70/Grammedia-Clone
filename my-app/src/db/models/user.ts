import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { hashPassword } from "../helpers/hash";
import { z } from "zod";
import { IInputLogin } from "@/app/api/users/login/route";

type User = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

type NewUser = Omit<User, "_id">;

const UserInputSchema = z.object({
  name: z.string().min(1, { message: "Full Name cannot empty" }),
  username: z.string().min(1, { message: "Username cannot empty" }),
  email: z
    .string()
    .min(1, { message: "Email cannot empty" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password minumum 5 character" }),
});

const UserInputLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot empty" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password cannot empty" }),
});

class UserModel {
  static collection() {
    return getCollection("Users");
  }

  static async login(inputLogin: IInputLogin) {
    const parseResult = UserInputLoginSchema.safeParse(inputLogin);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    return await this.collection().findOne({ email: inputLogin.email });
  }

  static async findUsers() {
    return (await this.collection().find().toArray()) as User[];
  }

  static async register(newUser: NewUser) {
    // manual validasi
    // if (!newUser.name) throw { error: "Full Name is required" };
    // if (!newUser.username) throw { error: "Username is required" };
    // if (!newUser.email) throw { error: "Email is required" };
    // if (!newUser.password) throw { error: "Password is required" };
    const parseResult = UserInputSchema.safeParse(newUser);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    let user = await this.collection().findOne({ username: newUser.username });
    if (user) throw { error: "Username already used" };

    user = await this.collection().findOne({ email: newUser.email });
    if (user) throw { error: "Email already used" };

    if (newUser.password.length < 5)
      throw { error: "Minimum length of password is 5 character" };

    newUser = {
      ...newUser,
      password: hashPassword(newUser.password),
      role: "user",
    };
    await this.collection().insertOne(newUser);

    return { message: "Success create user" };
  }
}

export default UserModel;
