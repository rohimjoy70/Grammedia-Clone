import AddToCart from "@/components/addToCart";
import Footer from "@/components/footer";
import { NavbarProductsDetail } from "@/components/navbar";

import { IProduct } from "@/interfaces/interface";
const baseUrl = process.env.BASE_URL;

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
   params: { slug: string };
   searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const slug = params.slug;

   const product = await getDataBySlug(slug);

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: product.name,
      openGraph: {
         images: ["/some-specific-page-image.jpg", ...previousImages],
      },
   };
}

async function getDataBySlug(slug: string) {
   const response = await fetch(baseUrl + "products/" + slug);
   const product = (await response.json()) as IProduct;
   return product;
}

export default async function DetailProduct({ params }: { params: { slug: string } }) {
   const product = await getDataBySlug(params.slug);

   return (
      <>
         <NavbarProductsDetail />
         <div className="mx-10 mt-32 mb-2 min-h-screen flex flex-col justify-between">
            {product != null ? (
               <>
                  <div className="w-full flex flex-col lg:flex-row gap-2">
                     <div className="w-full lg:w-64 h-80 shadow-lg">
                        <div
                           className="w-full h-full rounded-lg"
                           style={{
                              backgroundImage: `url(${product.thumbnail})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                           }}
                        />
                     </div>
                     <div className="w-full lg:w-1/2 shadow-lg p-5 flex flex-col">
                        <p className="text-xl font-base">{product.author}</p>
                        <p className="text-2xl font-semibold">
                           {`"`}
                           {product.name}
                           {`"`}
                        </p>
                        <p className="mt-5 font-semibold">Deskripsi Buku:</p>
                        <p className="text-justify">{product.description}</p>
                        <p className="mt-5 font-semibold">Excerpt:</p>
                        <p className="text-justify">{product.excerpt}</p>
                        <div className="flex-grow" />
                        <div className="flex justify-end">
                           <AddToCart productId={String(product._id)} />
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <div className="flex-grow flex items-center justify-center">Not Found</div>
            )}
            <Footer />
         </div>
      </>
   );
}
