import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponce, CategoriesResponce } from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),

  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponce, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<AllProductsResponce, string>({
      query: (id: string) => `admin-products?id=${id}`,
    }),
    categories: builder.query<CategoriesResponce, string>({
      query: () => `categories`,
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
} = productAPI;
