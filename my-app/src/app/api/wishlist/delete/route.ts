import WishlistModel from "@/db/models/wishlist";
export const dynamic = "force-dynamic";
export async function DELETE(request: Request) {
   try {
      const productId = await request.json();
      // console.log(productId, "<<<<<<<<< product id");
      const userId = request.headers.get("x-id-user") as string;
      if (!productId) throw { error: "ProductId cannot empty" };
      if (!userId) throw { error: "userId is required" };

      const result = await WishlistModel.delete(productId, userId);

      return Response.json(result);
   } catch (error) {
      console.log(error);
      return Response.json({ error });
   }
}
