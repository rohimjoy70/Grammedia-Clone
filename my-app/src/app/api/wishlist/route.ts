import WishlistModel from "@/db/models/wishlist";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-id-user") as string;
    const result = await WishlistModel.getWishlist(userId);

    return Response.json({ data: result });
  } catch (error) {
    return Response.json(error);
  }
}
