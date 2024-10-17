import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Recommendations from "./Recommendations";
import { IAppEntry } from "@/services/types";

const mockApps: IAppEntry[] = [
  {
    "im:artist": {
      label: "測試開發者2",
      attributes: { href: "https://apps.apple.com/tw/developer/id1" },
    },
    "im:releaseDate": {
      label: "2023-02-02T00:00:00-07:00",
      attributes: { label: "2023年2月2日" },
    },
    id: {
      label: "1",
      attributes: { "im:id": "1", "im:bundleId": "1" },
    },
    "im:name": { label: "測試應用1" },
    "im:image": [
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
    ],
    title: { label: "測試應用1" },
    summary: { label: "測試摘要1" },
    "im:price": { label: "免費", attributes: { amount: "0", currency: "TWD" } },
    "im:contentType": {
      attributes: { term: "Application", label: "應用程式" },
    },
    rights: { label: "版權所有" },
    link: [
      {
        attributes: {
          rel: "alternate",
          type: "text/html",
          href: "https://apps.apple.com/tw/app/id1",
        },
      },
    ],
    category: {
      attributes: {
        "im:id": "6000",
        term: "測試類別1",
        scheme: "https://apps.apple.com/tw/genre/ios-商業/id6000",
        label: "測試類別1",
      },
    },
  },
  {
    "im:artist": {
      label: "測試開發者2",
      attributes: { href: "https://apps.apple.com/tw/developer/id1" },
    },
    "im:releaseDate": {
      label: "2023-02-02T00:00:00-07:00",
      attributes: { label: "2023年2月2日" },
    },
    id: {
      label: "2",
      attributes: { "im:id": "2", "im:bundleId": "2" },
    },
    "im:name": { label: "測試應用2" },
    "im:image": [
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
      { label: "https://picsum.photos/200", attributes: { height: "100" } },
    ],
    title: { label: "測試應用2" },
    summary: { label: "測試摘要2" },
    "im:price": { label: "免費", attributes: { amount: "0", currency: "TWD" } },
    "im:contentType": {
      attributes: { term: "Application", label: "應用程式" },
    },
    rights: { label: "版權所有" },
    link: [
      {
        attributes: {
          rel: "alternate",
          type: "text/html",
          href: "https://apps.apple.com/tw/app/id1",
        },
      },
    ],
    category: {
      attributes: {
        "im:id": "6001",
        term: "測試類別2",
        scheme: "https://apps.apple.com/tw/genre/ios-商業/id6001",
        label: "測試類別2",
      },
    },
  },
];

describe("Recommendations 元件", () => {
  const mockHandleAppClick = jest.fn();

  it("應該正確渲染載入狀態", () => {
    render(
      <Recommendations
        apps={[]}
        isLoading={true}
        handleAppClick={mockHandleAppClick}
      />
    );
    expect(screen.getByTestId("recommendations-loading")).toBeInTheDocument();
  });

  it("應該正確渲染空狀態", () => {
    render(
      <Recommendations
        apps={[]}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    expect(screen.getByTestId("recommendations-empty")).toBeInTheDocument();
  });

  it("應該正確渲染應用程式列表", () => {
    render(
      <Recommendations
        apps={mockApps}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    expect(screen.getByTestId("recommendation-1")).toBeInTheDocument();
    expect(screen.getByTestId("recommendation-2")).toBeInTheDocument();
  });

  it("點擊應用程式時應該呼叫 handleAppClick", async () => {
    render(
      <Recommendations
        apps={mockApps}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    fireEvent.click(screen.getByTestId("recommendation-1"));
    expect(mockHandleAppClick).toHaveBeenCalledWith("1");
  });
});
