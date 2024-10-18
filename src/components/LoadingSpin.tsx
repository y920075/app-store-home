import { Spin } from "antd";

const LoadingSpin = () => {
  return (
    <div className="flex h-40 items-center justify-center">
      <Spin data-testid="loading-spinner" />
    </div>
  );
};

export default LoadingSpin;
