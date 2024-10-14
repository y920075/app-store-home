import { configureStore } from "@reduxjs/toolkit";
import { itunesApi } from "@/services/itunes";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [itunesApi.reducerPath]: itunesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(itunesApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
