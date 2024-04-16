import ProductModel from "@/db/models/product";
// import { type NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
   try {
      // console.log("test masuk gak ke controller product <<<<<<<<<<<<<<<");
      const page = request.url.split("?")[1].split("=")[1];
      // const searchParams = request.nextUrl.searchParams;
      // const page = searchParams.get("page");
      // console.log(page, "<<<<<<<<<< value page");
      const result = await ProductModel.getProduct(Number(page));
      // console.log(result, "<<<<<<");
      return Response.json(result);
   } catch (error) {
      console.log(error);
      return Response.json(error);
   }
}
