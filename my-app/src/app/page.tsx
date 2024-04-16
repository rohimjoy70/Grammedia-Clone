import promo2 from "../../public/banner_promo/promo2.jpg";
import promo3 from "../../public/banner_promo/promo3.jpg";
import { BannerPromo1 } from "@/components/banner";
export const dynamic = "force-dynamic";

// import cover book
import Footer from "@/components/footer";
import NavbarHome from "@/components/navbar";
import { IProduct } from "@/interfaces/interface";
import Link from "next/link";

const baseUrl = process.env.BASE_URL as string;

export default async function Home() {
   const response = await fetch(baseUrl + "products/preview");
   const product = await response.json();

   return (
      <>
         <NavbarHome />
         <div className="mx-10 mt-32">
            <div className="grid grid-col-3 grid-flow-col gap-2">
               <BannerPromo1 />
               <div
                  className="bg-lime-300 rounded-lg"
                  style={{
                     backgroundImage: `url(${promo2.src})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                  }}
               ></div>
               <div
                  className="bg-blue-700 rounded-lg"
                  style={{
                     backgroundImage: `url(${promo3.src})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                  }}
               ></div>
            </div>
            <h2 className="text-3xl my-2 font-medium">Recommendation Gramedia For You</h2>
            <div className="p-2 flex gap-4 flex-wrap items-center">
               {product.data &&
                  product.data.map((product: IProduct) => {
                     return (
                        <div key={String(product._id)} className="w-52 h-96 shadow-md rounded-lg">
                           <div className="border-2 w-42 p-1 h-72">
                              <Link href={"/products/" + product.slug}>
                                 <div
                                    className="w-full h-full"
                                    style={{
                                       backgroundImage: `url(${product.thumbnail})`,
                                       backgroundSize: "cover",
                                       backgroundPosition: "center",
                                    }}
                                 ></div>
                              </Link>
                           </div>
                           <div className="p-1 ml-1">
                              <div className="text-sm font-light">{product.author}</div>
                              <div className="text-sm font-semibold"> {product.name.length > 25 ? `${product.name.slice(0, 25)}.....` : product.name}</div>
                              <div className="text-base text-blue-600">Rp {Number(product.price).toLocaleString("id-ID")},-</div>
                           </div>
                        </div>
                     );
                  })}
               <Link href={"/products"} className="text-2xl border border-sky-300 text-center p-2 rounded-xl text-sky-500 font-bold hover:-translate-y-1 hover:scale-105 duration-200 hover:bg-sky-400 hover:text-white">
                  See all
               </Link>
            </div>
         </div>
         <Footer />
      </>
   );
}
