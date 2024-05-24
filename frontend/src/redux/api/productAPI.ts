import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllProductsResponce } from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),

  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponce, string>({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductsQuery } = productAPI;