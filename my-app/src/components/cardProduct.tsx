"use client";

import { redirectToLogin } from "@/actions/user";
import { IProduct } from "@/interfaces/interface";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const dynamic = "force-dynamic";
interface ProductCartProps {
   product: IProduct;
   setUpdateData: Dispatch<SetStateAction<boolean>>;
}

export function CartProduct({ product, setUpdateData }: ProductCartProps) {
   const addToWishlist = async () => {
      try {
         const response = await fetch(baseUrl + "wishlist/add", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(product._id),
         });
         const result = await response.json();
         if (result.message == "Invalid token") {
            redirectToLogin();
         } else {
            setUpdateData(true);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="w-52 h-96 shadow-md rounded-lg relative">
         <Link href={"/products/" + product.slug}>
            <div className="border-2 w-42 p-1 h-72">
               <div
                  className="w-full h-full"
                  style={{
                     backgroundImage: `url(${product.thumbnail})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                  }}
               ></div>
            </div>
            <div className="p-1 ml-1">
               <div className="text-sm font-light">{product.author}</div>
               <div className="text-sm font-semibold">{product.name.length > 25 ? `${product.name.slice(0, 25)}.....` : product.name}</div>
               <div className="text-base text-blue-600 font-semibold">Rp {Number(product.price).toLocaleString("id-ID")},-</div>
            </div>
         </Link>
         <button
            onClick={addToWishlist}
            className="bg-sky-500 flex justify-center rounded-full items-center border text-white text-2xl font-semibold w-10 h-10 shadow-md absolute right-1 bottom-1 hover:scale-x-105 hover:-translate-y-1 duration-300"
         >
            +
         </button>
      </div>
   );
}
