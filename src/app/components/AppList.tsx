import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { List } from "antd";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { IAppEntry } from "@/services/types";
import LoadingSpin from "@/components/LoadingSpin";

const ListItem = ({
  app,
  index,
  handleAppClick,
}: {
  app: IAppEntry;
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
        <div
          className="grid cursor-pointer grid-cols-[32px_64px_1fr] items-center"
          data-testid={`app-list-item-${app.id.attributes["im:id"]}`}
        >
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
  apps: IAppEntry[];
  isLoading: boolean;
  handleAppClick: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(0);

  const pageApps = apps.slice(0, (pageIndex + 1) * pageSize);
  const maxPageIndex = Math.ceil(apps.length / pageSize);

  // 如果目前頁面高度足夠顯示更多的話，就手動觸發一次 next
  // 因為 InfiniteScroll 似乎不會自動觸發
  useEffect(() => {
    if (
      ref.current &&
      ref.current.getBoundingClientRect().bottom < window.innerHeight
    ) {
      setPageIndex((prev) => prev + 1);
    }
  }, []);

  return (
    <div ref={ref}>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <InfiniteScroll
          dataLength={pageApps.length}
          hasMore={pageIndex < maxPageIndex}
          style={{ overflowY: "hidden" }}
          next={() => {
            setPageIndex((prev) => prev + 1);
          }}
          loader={<LoadingSpin />}
        >
          <List
            dataSource={pageApps}
            renderItem={(app, index) => (
              <ListItem
                key={app.id.attributes["im:id"]}
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
