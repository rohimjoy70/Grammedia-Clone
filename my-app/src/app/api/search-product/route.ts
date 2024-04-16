import ProductModel from "@/db/models/product";
// import { type NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // const searchKey = await request.json();
    // const searchParams = request.nextUrl.searchParams;
    // const searchKey = searchParams.get("search") as string;
    const search = request.url.split("?")[1].split("=")[1];
    const result = await ProductModel.getProductByName(search);
    return Response.json(result);
  } catch (error) {
    return Response.json(error);
  }
}
