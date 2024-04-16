import { getCollection } from "../config";
import { IPagination, IProduct } from "@/interfaces/interface";

type NewProduct = Omit<IProduct, "_id">;

class ProductModel {
   static collection() {
      return getCollection("Books");
   }

   static async addBook(newBook: NewProduct) {
      newBook.createdAt = new Date();
      newBook.updatedAt = new Date();

      await this.collection().insertOne(newBook);

      return { message: "Success add new book" };
   }

   static async getProduct(page: number) {
      const dataPerpage = page * 50;
      const skipData = dataPerpage * page - dataPerpage;

      const aggTotalData = [
         {
            $group: {
               _id: null,
               count: {
                  $count: {},
               },
            },
         },
      ];

      const agg = [
         {
            $skip: skipData,
         },
         {
            $limit: dataPerpage,
         },
      ];

      const totalData = await this.collection().aggregate(aggTotalData).toArray();

      const products = (await this.collection().aggregate(agg).toArray()) as IProduct[];

      const result: IPagination = {
         data: products,
         currentPage: page,
         currentData: products.length,
         totalData: totalData[0].count,
         totalPage: Math.ceil(totalData[0].count / dataPerpage),
      };

      return result;
   }

   static async getProductPreview() {
      const agg = [
         {
            $limit: 5,
         },
      ];
      const products = (await this.collection().aggregate(agg).toArray()) as IProduct[];
      return products;
   }

   static async getProductByName(searchKey: string) {
      const products = (await this.collection()
         .find({ name: { $regex: searchKey, $options: "i" } })
         .toArray()) as IProduct[];

      return products;
   }

   static async findBySlug(slug: string) {
      const product = await this.collection().findOne({ slug });

      return product;
   }
}

export default ProductModel;
