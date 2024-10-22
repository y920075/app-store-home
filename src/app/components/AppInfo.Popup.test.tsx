import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { itunesApi } from "@/services/itunes";
import AppInfoPopup from "./AppInfoPopup";

const mockStore = configureStore({
  reducer: {
    [itunesApi.reducerPath]: itunesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itunesApi.middleware),
});

const mockAppInfo = {
  results: [
    {
      trackName: "測試應用",
      sellerName: "測試開發者",
      artworkUrl512: "https://example.com/image.jpg",
      averageUserRating: 4.5,
      userRatingCount: 1000,
      formattedPrice: "免費",
      description: "這是一個測試應用的描述。",
      releaseNotes: "這是最新版本的更新說明。",
      primaryGenreName: "工具",
      contentAdvisoryRating: "4+",
      languageCodesISO2A: ["ZH", "EN"],
      fileSizeBytes: "10485760",
      artistName: "測試公司",
      sellerUrl: "https://example.com",
    },
  ],
};

jest.mock("@/services/itunes", () => ({
  ...jest.requireActual("@/services/itunes"),
  useGetAppInfoQuery: jest.fn(),
}));

describe("AppInfoPopup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("應該顯示加載中狀態", async () => {
    const { useGetAppInfoQuery } = require("@/services/itunes");
    useGetAppInfoQuery.mockReturnValue({ isLoading: true });

    render(
      <Provider store={mockStore}>
        <AppInfoPopup id="123" isOpen={true} onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByTestId("loading-spin")).toBeInTheDocument();
  });

  it("應該顯示應用信息", async () => {
    const { useGetAppInfoQuery } = require("@/services/itunes");
    useGetAppInfoQuery.mockReturnValue({ data: mockAppInfo, isLoading: false });

    render(
      <Provider store={mockStore}>
        <AppInfoPopup id="123" isOpen={true} onClose={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("測試應用")).toBeInTheDocument();
      expect(screen.getByText("測試開發者")).toBeInTheDocument();
      expect(screen.getByText("免費")).toBeInTheDocument();
      expect(screen.getByText("應用程式描述")).toBeInTheDocument();
      expect(screen.getByText("這是一個測試應用的描述。")).toBeInTheDocument();
      expect(screen.getByText("新功能")).toBeInTheDocument();
      expect(screen.getByText("這是最新版本的更新說明。")).toBeInTheDocument();
      expect(screen.getByText("其他資訊")).toBeInTheDocument();
      expect(screen.getByText("開發者")).toBeInTheDocument();
      expect(screen.getByText("測試公司")).toBeInTheDocument();
      expect(screen.getByText("開發者網站")).toBeInTheDocument();
    });
  });
});
