"use client";
import React from "react";
import { Search, Star } from "lucide-react";
import {
  useGetTopFreeAppsQuery,
  useGetTopGrossingAppsQuery,
} from "@/services/itunes";

const SearchBar = () => (
  <div className="bg-white rounded-lg flex items-center p-2 mb-4">
    <Search className="text-gray-400 mr-2" size={20} />
    <input
      type="text"
      placeholder="搜尋"
      className="w-full focus:outline-none"
    />
  </div>
);

const Recommendations = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">推介</h2>
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        "Fyuse - 3D 相片",
        "Sound Rebound",
        "#LAUGH - create art in",
        "FOV - 3D photos &",
      ].map((app, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-xl mb-2"></div>
          <p className="text-xs text-center">{app}</p>
        </div>
      ))}
    </div>
  </div>
);

const AppList = () => {
  const apps = [
    {
      name: "Google 地圖 - 導航和大眾運輸",
      category: "導航",
      rating: 3,
      reviews: 70,
    },
    { name: "Instagram", category: "照片和視訊", rating: 3, reviews: 123 },
  ];

  return (
    <div className="space-y-4">
      {apps.map((app, index) => (
        <div key={index} className="flex items-center">
          <span className="text-lg font-semibold mr-4">{index + 1}</span>
          <div className="w-12 h-12 bg-gray-300 rounded-xl mr-4"></div>
          <div className="flex-grow">
            <h3 className="font-semibold">{app.name}</h3>
            <p className="text-sm text-gray-500">{app.category}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < app.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({app.reviews})
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AppStorePage = () => {
  const { isLoading, isError, isFetching, data } = useGetTopFreeAppsQuery(100);
  const { data: topGrossingApps } = useGetTopGrossingAppsQuery(10);
  return (
    <div className="max-w-md mx-auto bg-gray-100 p-4 font-sans">
      <SearchBar />
      <Recommendations />
      <AppList />
    </div>
  );
};

export default AppStorePage;
