import { verifyPassword } from "@/db/helpers/hash";
import { createToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/user";
import { cookies } from "next/headers";
import { ZodError } from "zod";
export const dynamic = "force-dynamic";
export interface IInputLogin {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body, "<<<<<<<<<<<<<");
    // if (!body.email) throw { error: "Email is required" };
    // if (!body.password) throw { error: "Password is required" };
    const inputLogin: IInputLogin = {
      email: body.email,
      password: body.password,
    };
    const user = await UserModel.login(inputLogin);

    if (!user) {
      return Response.json(
        {
          error: "Invalid email/password",
        },
        {
          status: 401,
        }
      );
    }

    const isValid = verifyPassword(body.password, user.password);

    if (!isValid) {
      return Response.json(
        {
          error: "Invalid email/password",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = createToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    // set cookies froms server
    cookies().set("Authorization", `Bearer ${access_token}`);

    return Response.json({
      data: { access_token },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].message;

      return Response.json({ error: err }, { status: 400 });
    }

    return Response.json(error);
  }
}
