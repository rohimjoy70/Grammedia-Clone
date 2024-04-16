import WishlistModel from "@/db/models/wishlist";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
   try {
      const productId = await request.json();
      const userId = request.headers.get("x-id-user") as string;

      const result = await WishlistModel.addToWishlist(productId, userId);

      return Response.json(result);
   } catch (error) {
      return Response.json(error);
   }
}
