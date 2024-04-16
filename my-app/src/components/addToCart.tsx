"use client";

import { redirectToLogin, redirectToWishlist } from "@/actions/user";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const dynamic = "force-dynamic";
export default function AddToCart({ productId }: { productId: string }) {
   const addToWishlist = async () => {
      try {
         const response = await fetch(baseUrl + "wishlist/add", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(productId),
         });
         const result = await response.json();
         // console.log(result, "<<<<<<<<<<<< hasil add to cart<");
         if (result.message == "Invalid token") {
            redirectToLogin();
         } else {
            redirectToWishlist();
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="w-80 h-24 shadow-lg rounded-lg flex justify-center items-center">
         <button onClick={addToWishlist} className="bg-sky-400 w-32 h-10 text-xl font-bold rounded-lg text-white hover:-translate-y-1 hover:scale-105 duration-200">
            Add to cart
         </button>
      </div>
   );
}
