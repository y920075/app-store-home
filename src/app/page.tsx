"use client";
import React, { useState } from "react";
import {
  useGetTopFreeAppsQuery,
  useGetTopGrossingAppsQuery,
} from "@/services/itunes";

import SearchBar from "./components/SearchBar";
import Recommendations from "./components/Recommendations";
import AppList from "./components/AppList";
import AppInfoPopup from "./components/AppInfoPopup";
import { IAppEntry } from "@/services/types";
const AppStorePage = () => {
  const {
    isLoading: isLoadingFreeApps,
    isFetching: isFetchingFreeApps,
    data: topFreeApps,
  } = useGetTopFreeAppsQuery(100);
  const {
    isLoading: isLoadingGrossingApps,
    isFetching: isFetchingGrossingApps,
    data: topGrossingApps,
  } = useGetTopGrossingAppsQuery(10);
  const [searchValue, setSearchValue] = useState("");
  const [isAppInfoPopupOpen, setIsAppInfoPopupOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string>("");

  const filterApps = (app: IAppEntry) =>
    app["im:name"].label.toLowerCase().includes(searchValue.toLowerCase()) ||
    app.summary.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    app.title.label.toLowerCase().includes(searchValue.toLowerCase());

  const filteredApps = topFreeApps?.feed.entry.filter(filterApps);
  const filteredGrossingApps = topGrossingApps?.feed.entry.filter(filterApps);

  const handleAppClick = (id: string) => {
    setSelectedAppId(id);
    setIsAppInfoPopupOpen(true);
  };

  const handleCloseAppInfoPopup = () => {
    setSelectedAppId("");
    setIsAppInfoPopupOpen(false);
  };

  return (
    <div className="mx-auto max-w-md font-sans">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="border-b border-gray-300 p-4">
        <Recommendations
          apps={filteredGrossingApps || []}
          isLoading={isLoadingGrossingApps || isFetchingGrossingApps}
          handleAppClick={handleAppClick}
        />
      </div>
      <div className="px-4 pb-4">
        <AppList
          apps={filteredApps || []}
          isLoading={isLoadingFreeApps || isFetchingFreeApps}
          handleAppClick={handleAppClick}
        />
      </div>
      <AppInfoPopup
        id={selectedAppId}
        isOpen={isAppInfoPopupOpen}
        onClose={handleCloseAppInfoPopup}
      />
    </div>
  );
};

export default AppStorePage;
