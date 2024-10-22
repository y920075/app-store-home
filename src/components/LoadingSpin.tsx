import { Spin } from "antd";

const LoadingSpin = () => {
  return (
    <div className="flex h-40 items-center justify-center">
      <Spin data-testid="loading-spin" />
    </div>
  );
};

export default LoadingSpin;
