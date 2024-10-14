import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITunesStoreFeed, IAppInfoResponse } from "./types";

export const itunesApi = createApi({
  reducerPath: "itunesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/tw/rss" }),
  endpoints: (builder) => ({
    getTopFreeApps: builder.query<ITunesStoreFeed, number>({
      query: (limit) => {
        return `/topfreeapplications/limit=${limit}/json`;
      },
    }),
    getTopGrossingApps: builder.query<ITunesStoreFeed, number>({
      query: (limit) => {
        return `/topgrossingapplications/limit=${limit}/json`;
      },
    }),
    getAppInfo: builder.query<IAppInfoResponse, string>({
      query: (id) => {
        return `/lookup?id=${id}`;
      },
    }),
  }),
});

export const {
  useGetTopFreeAppsQuery,
  useGetAppInfoQuery,
  useGetTopGrossingAppsQuery,
} = itunesApi;
