import UserModel from "@/db/models/user";

export async function GET(request: Request) {
  try {
    const data = await UserModel.findUsers();
    return Response.json({
      data,
    });
  } catch (error) {
    return Response.json(error);
  }
}
