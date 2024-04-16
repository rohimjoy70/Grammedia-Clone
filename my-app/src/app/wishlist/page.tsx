"use client";

import Footer from "@/components/footer";
import { NavbarProducts } from "@/components/navbar";
import { Trash } from "@/components/icon";
import { useEffect, useState } from "react";
import { IProduct, IWishlist } from "@/interfaces/interface";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type GroupWishList = {
  detailProduct: IProduct;
  list: IWishlist[];
  _id: ObjectId;
};

export default function Products() {
  const [wishlist, setWishlist] = useState<GroupWishList[]>();
  const [total, setTotal] = useState(0);
  const [updateData, setUpdateData] = useState(false);

  const getWishlist = async () => {
    try {
      const response = await fetch(baseUrl + "wishlist");
      const result = await response.json();

      setWishlist(result.data);
      setTotal(0);
      let tmpTotal = 0;
      result.data?.forEach((el: GroupWishList) => {
        tmpTotal += el.list.length * Number(el.detailProduct.price);
      });
      setTotal(tmpTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const deteleWishlist = async (productId: string) => {
    try {
      await fetch(baseUrl + "wishlist/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });

      getWishlist();
      setUpdateData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const substractWishlist = async (wishlistId: string) => {
    try {
      await fetch(baseUrl + "wishlist/substract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistId),
      });

      getWishlist();
      setUpdateData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseWishlist = async (productId: string) => {
    try {
      await fetch(baseUrl + "wishlist/increase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });

      getWishlist();
      setUpdateData(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);
  // console.log(baseUrl, "<<<<<<<<< baseurl di wishlist next");
  return (
    <>
      <div>
        <NavbarProducts updateData={updateData} setUpdateData={setUpdateData} />
      </div>
      <div className="mx-10 mt-32">
        <h2 className="text-2xl my-2 font-serif font-semibold">Tas Belanja</h2>
        <div className="flex gap-2">
          <div className="shadow-lg w-2/3 rounded-lg min-h-80">
            {/* List */}
            {wishlist &&
              wishlist.map((product) => {
                return (
                  <div
                    key={String(product._id)}
                    className="flex flex-row items-center border-b-2 p-4 justify-between"
                  >
                    <div className="flex">
                      <div
                        className="w-16 h-24"
                        style={{
                          backgroundImage: `url(${product.detailProduct.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="ml-4 w-80">
                        <p className="text-xl font-semibold">
                          {product.detailProduct.name.length > 25
                            ? `${product.detailProduct.name.slice(0, 25)}.....`
                            : product.detailProduct.name}
                        </p>
                        <span>{product.detailProduct.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 w-64">
                      <button
                        onClick={() => {
                          substractWishlist(String(product.list[0]._id));
                        }}
                        className="bg-sky-500 flex justify-center rounded-full items-center border text-white text-2xl font-semibold w-10 h-10 shadow-md right-1 bottom-1 hover:scale-x-105 hover:-translate-y-1 duration-300"
                      >
                        -
                      </button>
                      <span className="text-3xl font-semibold">
                        {product.list.length}
                      </span>
                      <button
                        onClick={() => [increaseWishlist(String(product._id))]}
                        className="bg-sky-500 flex justify-center rounded-full items-center border text-white text-2xl font-semibold w-10 h-10 shadow-md right-1 bottom-1 hover:scale-x-105 hover:-translate-y-1 duration-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col justify-center w-full items-center">
                      <p className="text-xl text-blue-600 font-semibold">
                        Rp.{" "}
                        {(
                          product.list.length *
                          Number(product.detailProduct.price)
                        ).toLocaleString("id-ID")}
                        , -
                      </p>
                      <button
                        onClick={() => {
                          deteleWishlist(String(product._id));
                        }}
                        className="flex gap-2 mt-2 items-center hover:text-red-700"
                      >
                        {" "}
                        <Trash />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="shadow w-1/3 rounded-lg h-60 flex flex-col justify-between">
            <h1 className="text-3xl p-3 font-bold border-b-2">
              Rincian Belanja
            </h1>
            <div className="flex justify-between p-8 font-bold items-center">
              <p>Ringkasan Pembayaran</p>
              <span className="text-xl text-blue-600 font-semibold">
                Rp {total.toLocaleString("id-ID")}, -
              </span>
            </div>
            <div className="flex justify-center self-end w-full mb-5">
              <button className="bg-blue-600 text-white text-2xl font-semibold p-2 rounded-3xl w-5/6 hover:-translate-y-1 duration-300 hover:scale-105">
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        </div>
        <div className="p-2 flex gap-4"></div>
      </div>
      <Footer />
    </>
  );
}
