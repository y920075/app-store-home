import axios from "axios";
import type { AxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ITunesStoreFeed, IAppInfoResponse } from "./types";

const axiosBaseGetQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<string, unknown, unknown> =>
  async (url) => {
    try {
      const result = await axios({
        url: baseUrl + url,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const itunesApi = createApi({
  reducerPath: "itunesApi",
  baseQuery: axiosBaseGetQuery({ baseUrl: "https://itunes.apple.com/tw/" }),
  endpoints: (builder) => ({
    getTopFreeApps: builder.query<ITunesStoreFeed, number>({
      query: (limit) => {
        return `/rss/topfreeapplications/limit=${limit}/json`;
      },
    }),
    getTopGrossingApps: builder.query<ITunesStoreFeed, number>({
      query: (limit) => {
        return `/rss/topgrossingapplications/limit=${limit}/json`;
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
