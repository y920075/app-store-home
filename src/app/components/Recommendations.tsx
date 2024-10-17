import { Spin, Empty } from "antd";
import Image from "next/image";
import type { IAppEntry } from "@/services/types";
const Recommendations = ({
  apps,
  isLoading,
  handleAppClick,
}: {
  apps: IAppEntry[];
  isLoading: boolean;
  handleAppClick: (id: string) => void;
}) => {
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">推薦</h2>
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spin />
        </div>
      ) : apps.length === 0 ? (
        <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="scrollbar-hide grid auto-cols-[64px] grid-flow-col gap-4 overflow-x-auto">
          {apps.map((app, index) => (
            <div
              key={index}
              className="flex w-16 cursor-pointer flex-col"
              onClick={() => handleAppClick(app.id.attributes["im:id"])}
            >
              <div className="mb-2 h-16 w-16 overflow-hidden rounded-xl bg-gray-300">
                <Image
                  src={app["im:image"][2].label}
                  alt={app.title.label}
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              </div>
              <p className="line-clamp-2 text-xs">{app.title.label}</p>
              <p className="mt-2 text-xs text-gray-500">
                {app.category.attributes.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
