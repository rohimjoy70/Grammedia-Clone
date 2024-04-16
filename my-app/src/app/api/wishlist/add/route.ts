import WishlistModel from "@/db/models/wishlist";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
   try {
      const productId = await request.json();
      const userId = request.headers.get("x-id-user") as string;

      const result = await WishlistModel.addToWishlist(productId, userId);
      // console.log(result, "<<<masuk sini");
      return Response.json(result);
   } catch (error) {
      if (error instanceof ZodError) {
         const err = error.issues[0].path + " " + error.issues[0].message;

         return Response.json({ error: err }, { status: 400 });
      }

      console.log(error);
      if (error == "Invalid token") {
         redirect("/login");
      }
      return Response.json({ error });
   }
}
