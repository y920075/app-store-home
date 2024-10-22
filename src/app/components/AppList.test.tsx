import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppList from "./AppList";
import { IAppEntry } from "@/services/types";

global.matchMedia = jest.fn((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

global.IntersectionObserver = class IntersectionObserver {
  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {}
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: number[] = [];
  takeRecords = jest.fn();
};

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

describe("AppList 元件", () => {
  const mockHandleAppClick = jest.fn();

  it("渲染載入中狀態", () => {
    render(
      <AppList apps={[]} isLoading={true} handleAppClick={mockHandleAppClick} />
    );
    expect(screen.getByTestId("loading-spin")).toBeInTheDocument();
  });

  it("渲染應用列表", () => {
    render(
      <AppList
        apps={mockApps}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    expect(screen.getByTestId("app-list-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("app-list-item-2")).toBeInTheDocument();
  });

  it("點擊應用項目時調用 handleAppClick", () => {
    render(
      <AppList
        apps={mockApps}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    fireEvent.click(screen.getByTestId("app-list-item-1"));
    expect(mockHandleAppClick).toHaveBeenCalledWith("1");
  });

  it("渲染正確的應用排名", () => {
    render(
      <AppList
        apps={mockApps}
        isLoading={false}
        handleAppClick={mockHandleAppClick}
      />
    );
    expect(screen.getByTestId("app-list-item-1")).toHaveTextContent("1");
  });
});
