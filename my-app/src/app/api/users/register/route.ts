import UserModel from "@/db/models/user";
import { ZodError } from "zod";

export async function POST(request: Request) {
   try {
      const createUser = await request.json();
      const result = await UserModel.register(createUser);

      return Response.json(result);
   } catch (error) {
      if (error instanceof ZodError) {
         const err = error.issues[0].message;

         return Response.json({ error: err }, { status: 400 });
      }

      return Response.json(error);
   }
}
