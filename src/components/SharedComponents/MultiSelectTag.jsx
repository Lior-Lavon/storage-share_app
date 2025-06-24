import React, { useEffect, useState } from "react";

const MultiSelectTag = ({ label, options }) => {
  const [selection, setSelection] = useState([]);

  const handleTagClick = (item) => {
    setSelection(
      (prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item) // remove if selected
          : [...prev, item] // add if not selected
    );
  };

  useEffect(() => {
    console.log("Current selection:", selection);
  }, [selection]);

  const isSelected = (item) => selection.includes(item);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium">{label}</label>
      <div className="px-4 py-2 flex flex-wrap gap-2">
        {options?.map((item, index) => (
          <div
            key={index}
            className={`w-fit py-1 px-4 rounded-full cursor-pointer transition ${
              isSelected(item)
                ? "bg-violet-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleTagClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectTag;
