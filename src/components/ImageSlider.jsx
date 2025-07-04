import React, { useRef, useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa6";

const ImageSlider = ({ images, onChange }) => {
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    setDotCount(images?.length);
  }, [images]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollEnd = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children);

    let closestIndex = 0;
    let minDiff = Infinity;

    children.forEach((child, index) => {
      const childLeft = child.offsetLeft;
      const diff = Math.abs(childLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    const target = children[closestIndex];
    if (target) {
      container.scrollTo({
        left: target.offsetLeft,
        behavior: "smooth",
      });
      setActiveDot(closestIndex); // ✅ Update here after scroll finishes
      onChange?.(closestIndex);
    }
  };

  const onScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(handleScrollEnd, 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl bg-gray-100">
      {images?.length > 1 && (
        <FaCaretLeft
          className="w-6 h-6 absolute left-[6px] top-1/2 transform -translate-y-1/2 bg-white rounded-lg"
          onClick={() => scroll("left")}
        />
      )}

      <div
        ref={containerRef}
        className="w-full h-full flex overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      {/* BottomDiv with dynamic dots */}
      <div className="w-full mt-2 flex items-center justify-center gap-2">
        {[...Array(dotCount)].map(
          (
            _,
            index // Use dotCount for number of dots
          ) => (
            <div
              key={index}
              className={`${
                activeDot === index ? "w-2" : "w-1"
              } h-1 rounded-full ${
                activeDot === index ? "bg-violet-600" : "bg-gray-200"
              }`}
            ></div>
          )
        )}
      </div>

      {images?.length > 1 && (
        <FaCaretRight
          className="w-6 h-6 absolute right-[6px] top-1/2 transform -translate-y-1/2 bg-white rounded-lg"
          onClick={() => scroll("right")}
        />
      )}
    </div>
  );
};

export default ImageSlider;
