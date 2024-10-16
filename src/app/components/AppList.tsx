import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, Spin } from "antd";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ITunesStoreFeed } from "@/services/types";

const ListItem = ({
  app,
  index,
  handleAppClick,
}: {
  app: ITunesStoreFeed["feed"]["entry"][number];
  index: number;
  handleAppClick: (id: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <List.Item onClick={() => handleAppClick(app.id.attributes["im:id"])}>
        <div className="grid cursor-pointer grid-cols-[32px_64px_1fr] items-center">
          <span className="mr-4 text-lg font-semibold">{index + 1}</span>
          <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
            <Image
              src={app["im:image"][2].label}
              alt={app.title.label}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{app.title.label}</h3>
            <p className="text-sm text-gray-500">
              {app.category.attributes.label}
            </p>
            {/* <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gray-300" />
              ))}
              <span className="ml-1 text-sm text-gray-500">(200)</span>
            </div> */}
          </div>
        </div>
      </List.Item>
    </motion.div>
  );
};

const AppList = ({
  apps,
  isLoading,
  handleAppClick,
}: {
  apps: ITunesStoreFeed["feed"]["entry"];
  isLoading: boolean;
  handleAppClick: (id: string) => void;
}) => {
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0);

  const pageApps = apps.slice(0, (pageIndex + 1) * pageSize);
  const maxPageIndex = Math.ceil(apps.length / pageSize);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spin />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={pageApps.length}
          hasMore={pageIndex < maxPageIndex}
          style={{ overflowY: "hidden" }}
          next={() => {
            setPageIndex((prev) => prev + 1);
          }}
          loader={<Spin />}
        >
          <List
            dataSource={pageApps}
            renderItem={(app, index) => (
              <ListItem
                key={index}
                app={app}
                index={index}
                handleAppClick={handleAppClick}
              />
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AppList;
