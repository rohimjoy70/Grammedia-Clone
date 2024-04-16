"use server";

import { verifyJose } from "@/db/helpers/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete("Authorization");
  redirect("/");
}

export async function redirectToLogin() {
  redirect("/login");
}

export async function redirectToWishlist() {
  redirect("/wishlist");
}

export async function redirectToProducts() {
  redirect("/products");
}

export async function isLogin() {
  const authorization = cookies().get("Authorization");
  if (!authorization) return { status: false, role: "" };

  const token = authorization.value.split(" ")[1];
  const decode = await verifyJose<{
    _id: string;
    email: string;
    role: string;
  }>(token);
  // console.log(decode);
  return { status: true, role: decode.role };
}

export async function setCookies(token: string) {
  cookies().set("Authorization", `Bearer ${token}`);
}
