import ProductModel from "@/db/models/product";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
   try {
      const product = await ProductModel.findBySlug(params.slug);
      // console.log(product, "<<<masuk sini");
      return Response.json(product);
   } catch (error) {
      return Response.json(error);
   }
}
