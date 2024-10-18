import { useState, useRef } from "react";

const useDraggableScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }
    isDragging.current = true;
    startX.current = event.clientX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };

  const handleMouseUp = () => {
    if (!ref.current) {
      return;
    }
    isDragging.current = false;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !ref.current) {
      return;
    }

    const x = event.clientX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };
};

export default useDraggableScroll;
