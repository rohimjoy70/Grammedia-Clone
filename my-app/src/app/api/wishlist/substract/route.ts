import WishlistModel from "@/db/models/wishlist";

export async function POST(request: Request) {
  try {
    const wishlistId = await request.json();
    //   console.log(wishlistId, "<<< di controller");
    const result = await WishlistModel.deleteOne(wishlistId);
    // console.log(result, "<<< di controller");
    return Response.json(result);
  } catch (error) {
    return Response.json(error);
  }
}
