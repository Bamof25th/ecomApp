import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponce,
  CategoriesResponce,
  MessageResponce,
  NewProductRequest,
  SearchProductsRequest,
  SearchProductsResponce,
} from "../../types/api-types";

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
    searchProducts: builder.query<
      SearchProductsResponce,
      SearchProductsRequest
    >({
      query: ({ price, page, category, search, sort }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;

        return base;
      },
    }),
    newProduct: builder.mutation<MessageResponce, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
} = productAPI;
