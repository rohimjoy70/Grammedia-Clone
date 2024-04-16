import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { IWishlist } from "@/interfaces/interface";
import { z } from "zod";

interface CheckNewWishList {
   productId: string;
   userId: string;
}

type NewWishList = Omit<IWishlist, "_id" | "detailProduct">;

const InputWishlistSchema = z.object({
   userId: z.string().min(1, { message: "UserId is required" }),
   productId: z.string().min(1, { message: "ProductId cannot empty" }),
});

class WishlistModel {
   static collection() {
      return getCollection("Wishlists");
   }
   static async addToWishlist(productId: string, userId: string) {
      const cekInputWishlist: CheckNewWishList = { productId, userId };
      const parseResult = InputWishlistSchema.safeParse(cekInputWishlist);
      if (!parseResult.success) {
         throw parseResult.error;
      }

      // console.log("masuk sini<<<<<<<");

      const newWishList: NewWishList = {
         productId: new ObjectId(productId),
         userId: new ObjectId(userId),
         createdAt: new Date(),
         updatedAt: new Date(),
      };

      await this.collection().insertOne(newWishList);

      return { message: "Success add wishlist" };
   }

   static async getWishlist(userId: string) {
      const agg = [
         {
            $match: {
               userId: new ObjectId(String(userId)),
            },
         },
         {
            $group: {
               _id: "$productId",
               list: {
                  $addToSet: "$$ROOT",
               },
            },
         },
         {
            $lookup: {
               from: "Books",
               localField: "_id",
               foreignField: "_id",
               as: "detailProduct",
            },
         },
         {
            $unwind: {
               path: "$detailProduct",
               preserveNullAndEmptyArrays: true,
            },
         },
      ];

      const wishlist = await this.collection().aggregate(agg).toArray();

      return wishlist;
   }

   static async getTotalWishlist(userId: string) {
      const agg = [
         {
            $match: {
               userId: new ObjectId(String(userId)),
            },
         },
      ];
      const wishlist = await this.collection().aggregate(agg).toArray();

      return wishlist.length;
   }

   static async delete(productId: string, userId: string) {
      await this.collection().deleteMany({
         $and: [
            {
               productId: new ObjectId(String(productId)),
            },
            {
               userId: new ObjectId(String(userId)),
            },
         ],
      });

      return { message: "Success to delete wishlist" };
   }

   static async deleteOne(wishlistId: string) {
      await this.collection().deleteOne({
         _id: new ObjectId(String(wishlistId)),
      });

      return { message: "Success to delete one wishlist" };
   }
}

export default WishlistModel;
