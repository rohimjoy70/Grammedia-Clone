import { ObjectId } from "mongodb";

export interface IProduct {
  _id: ObjectId;
  author: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: [string];
  thumbnail: string;
  images: [string];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  detailProduct: IProduct;
}

export interface IPagination {
  data: IProduct[];
  currentPage: number;
  currentData: number;
  totalData: number;
  totalPage: number;
}
