import React from "react";
import { Modal, Spin, Rate } from "antd";
import Image from "next/image";
import { useGetAppInfoQuery } from "@/services/itunes";

interface AppInfoPopupProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const AppInfoPopup: React.FC<AppInfoPopupProps> = ({ id, isOpen, onClose }) => {
  const {
    data: appInfo,
    isLoading,
    isFetching,
    error,
  } = useGetAppInfoQuery(id, { skip: !id });

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="max-w-md"
    >
      {isLoading || isFetching ? (
        <div className="flex h-40 items-center justify-center">
          <Spin size="large" data-testid="loading-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Loading Failed, please try again later
        </div>
      ) : appInfo ? (
        <div className="flex flex-col">
          <div className="mb-4 flex items-start pr-8">
            <div className="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
              <Image
                src={appInfo.results[0].artworkUrl512}
                alt={appInfo.results[0].trackName}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h2 className="mb-2 text-wrap text-2xl font-bold">
                {appInfo.results[0].trackName}
              </h2>
              <p className="mb-2 text-gray-600">
                {appInfo.results[0].sellerName}
              </p>
              <div className="mb-2 flex flex-wrap items-center">
                <Rate
                  disabled
                  defaultValue={appInfo.results[0].averageUserRating}
                  allowHalf
                />
                <span className="ml-2 text-gray-600">
                  ({appInfo.results[0].userRatingCount.toLocaleString()} 評分)
                </span>
              </div>
              <p className="text-lg font-semibold">
                {appInfo.results[0].formattedPrice}
              </p>
              <a
                href={appInfo.results[0].trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                前往下載
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">應用程式描述</h3>
            <pre className="max-w-full whitespace-pre-wrap text-gray-600">
              {appInfo.results[0].description}
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">新功能</h3>
            <p className="text-gray-600">{appInfo.results[0].releaseNotes}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">其他資訊</h3>
              <p>
                <strong>類別：</strong>
                {appInfo.results[0].primaryGenreName}
              </p>
              <p>
                <strong>年齡分級：</strong>
                {appInfo.results[0].contentAdvisoryRating}
              </p>
              <p>
                <strong>語言：</strong>
                {appInfo.results[0].languageCodesISO2A.join("、")}
              </p>
              <p>
                <strong>大小：</strong>
                {(
                  parseInt(appInfo.results[0].fileSizeBytes) /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">開發者</h3>
              <p>{appInfo.results[0].artistName}</p>
              {!!appInfo.results[0].sellerUrl && (
                <a
                  href={appInfo.results[0].sellerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  開發者網站
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default AppInfoPopup;
