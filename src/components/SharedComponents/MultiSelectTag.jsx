import React, { useEffect, useState } from "react";

const arraysEqual = (a, b) =>
  a.length === b.length && a.every((v) => b.includes(v));

const MultiSelectTag = ({
  label,
  chipFontSize,
  options,
  value = [],
  onChange,
  error = false,
}) => {
  const [selection, setSelection] = useState(value);

  useEffect(() => {
    if (!arraysEqual(value, selection)) {
      setSelection(value);
    }
  }, [value]);

  const handleTagClick = (item) => {
    const updated = selection.includes(item)
      ? selection.filter((i) => i !== item)
      : [...selection, item];

    setSelection(updated);
    onChange?.(updated); // notify parent if onChange provided
  };

  const isSelected = (item) => selection.includes(item);

  const capitalizeFirst = (text) => {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
  };

  return (
    <div className="flex flex-col gap-1">
      {label != "" && <label className="text-base font-medium">{label}</label>}
      <div
        className={`flex flex-wrap gap-2 ${
          error ? "border border-red-500" : ""
        }`}
      >
        {options?.map((item, index) => (
          <div
            key={index}
            className={`w-fit py-1 px-4 rounded-full cursor-pointer transition ${chipFontSize} ${
              isSelected(item)
                ? "bg-violet-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleTagClick(item)}
          >
            {capitalizeFirst(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectTag;
