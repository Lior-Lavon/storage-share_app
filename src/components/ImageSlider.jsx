// import React, { useRef } from "react";

// const ImageSlider = ({ images }) => {
//   const containerRef = useRef(null);

//   const scroll = (direction) => {
//     // if (e && e.stopPropagation) e.stopPropagation();
//     const container = containerRef.current;
//     if (!container) return;
//     const scrollAmount = container.offsetWidth;
//     container.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="relative w-full h-full rounded-2xl bg-red-500">
//       <button
//         onClick={() => scroll("left")}
//         type="button"
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent shadow px-2 py-1"
//       >
//         ◀
//       </button>

//       <div
//         ref={containerRef}
//         className="w-full h-full flex overflow-x-auto scrollbar-hide scroll-smooth"
//       >
//         {images.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Slide ${index}`}
//             className="w-full h-full object-cover flex-shrink-0 rounded-lg"
//           />
//         ))}
//       </div>

//       <button
//         onClick={() => scroll("right")}
//         type="button"
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent shadow px-2 py-1"
//       >
//         ▶
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;

import React, { useRef, useEffect } from "react";

const ImageSlider = ({ images }) => {
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

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
    const containerWidth = container.offsetWidth;
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
    <div className="relative w-full h-full rounded-2xl bg-red-500">
      <button
        onClick={() => scroll("left")}
        type="button"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent shadow px-2 py-1 z-10"
      >
        ◀
      </button>

      <div
        ref={containerRef}
        className="w-full h-full flex overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        type="button"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent shadow px-2 py-1 z-10"
      >
        ▶
      </button>
    </div>
  );
};

export default ImageSlider;
