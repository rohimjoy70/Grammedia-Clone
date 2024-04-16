"use client";

import Link from "next/link";
import AnimateCart from "./cart";
import Icon, { Help } from "./icon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isLogin, logout } from "@/actions/user";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function NavbarHome() {
   return (
      <>
         <nav className="fixed z-10 top-0 border-b  shadow-md w-full bg-white h-24s">
            <div className="bg-sky-200 flex justify-end gap-1">
               <Help />
               <span className="mr-10 hover:cursor-pointer hover:scale-105 font-bold">Bantuan</span>
            </div>
            <div className="h-20 border flex items-center justify-between">
               <Icon />
               <Link href={"login"} className="hover:text-sky-400 mr-20 font-bold font-sans hover:cursor-pointer w-20 text-xl text-center hover:underline underline-offset-8" style={{ color: "#07a2f5" }}>
                  Login
               </Link>
            </div>
         </nav>
      </>
   );
}

type PropsNavProduct = {
   updateData: boolean;
   setUpdateData: Dispatch<SetStateAction<boolean>>;
};

export function NavbarProducts({ updateData, setUpdateData }: PropsNavProduct) {
   const [total, setTotal] = useState(0);
   const [hasLogin, setHasLogin] = useState(false);
   const [role, setRole] = useState("");

   const getWishlistTotal = async () => {
      try {
         const response = await fetch(baseUrl + "wishlist/total");
         const result = await response.json();

         setTotal(result);
         setUpdateData(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      (async () => {
         const result = await isLogin();
         setHasLogin(result.status);
         if (result.status) {
            getWishlistTotal();
         }
         setRole(result.role);
      })();
   }, [updateData]);

   return (
      <>
         <nav className="fixed z-10 top-0 border-b  shadow-md w-full bg-white h-24s">
            <div className="bg-sky-200 flex justify-end gap-1">
               <Help />
               <span className="mr-10 hover:cursor-pointer hover:scale-105 font-bold">Bantuan</span>
            </div>
            <div className="h-20 border flex items-center justify-between">
               <Link href={"/"}>
                  <Icon />
               </Link>
               <div className="flex gap-2">
                  {hasLogin ? (
                     <Link href={"/wishlist"} className="relative mr-10">
                        <AnimateCart />
                        <span className="absolute text-center text-white font-semibold bg-sky-500 rounded-full w-6 h-6 -top-3 right-0">{total}</span>
                     </Link>
                  ) : (
                     ""
                  )}
                  {hasLogin ? (
                     <>
                        <div
                           onClick={() => {
                              logout();
                           }}
                           className="hover:text-sky-400 hover:cursor-pointer w-20 font-bold text-xl text-center hover:underline underline-offset-8 mr-20"
                           style={{ color: "#07a2f5" }}
                        >
                           Logout
                        </div>
                     </>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         </nav>
      </>
   );
}

export function NavbarProductsDetail() {
   const [total, setTotal] = useState(0);
   const [hasLogin, setHasLogin] = useState(false);
   const [role, setRole] = useState("");

   const getWishlistTotal = async () => {
      try {
         const response = await fetch(baseUrl + "wishlist/total");
         const result = await response.json();

         setTotal(result);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      (async () => {
         const result = await isLogin();
         setHasLogin(result.status);
         if (result.status) {
            getWishlistTotal();
         }
         setRole(result.role);
      })();
   }, []);

   return (
      <>
         <nav className="fixed z-10 top-0 border-b  shadow-md w-full bg-white h-24s">
            <div className="bg-sky-200 flex justify-end gap-1">
               <Help />
               <span className="mr-10 hover:cursor-pointer hover:scale-105 font-bold">Help</span>
            </div>
            <div className="h-20 border flex items-center justify-between">
               <Link href={"/products"}>
                  <Icon />
               </Link>
               <div className="flex gap-2">
                  {hasLogin ? (
                     <Link href={"/wishlist"} className="relative mr-10">
                        <AnimateCart />
                        <span className="absolute text-center text-white font-semibold bg-sky-500 rounded-full w-6 h-6 -top-3 right-0">{total}</span>
                     </Link>
                  ) : (
                     ""
                  )}
                  {hasLogin ? (
                     <>
                        <div
                           onClick={() => {
                              logout();
                           }}
                           className="hover:text-sky-400 hover:cursor-pointer w-20 font-bold text-xl text-center hover:underline underline-offset-8 mr-20"
                           style={{ color: "#07a2f5" }}
                        >
                           Logout
                        </div>
                     </>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         </nav>
      </>
   );
}
