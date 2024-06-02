import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponce } from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponce, string>({
      query: (order) => ({ url: "new", methord: "POST", body: order }),
    }),
  }),
});

export const { useNewOrderMutation } = orderApi;
