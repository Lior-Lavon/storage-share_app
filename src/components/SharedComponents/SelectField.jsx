// import React from "react";

// const SelectField = ({
//   label,
//   value,
//   onChange,
//   options = [],
//   disabled = false,
// }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-base font-medium">{label}</label>
//     <select
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
//     >
//       <option value="" disabled>
//         Select your option
//       </option>
//       {options.map((option) => {
//         if (typeof option === "object" && option !== null) {
//           return (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           );
//         }
//         return (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         );
//       })}
//     </select>
//   </div>
// );

// export default SelectField;

import React from "react";

const formatLabel = (value) => {
  return value
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
};
const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  error = false,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 h-11 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
        error ? "border border-red-500" : ""
      }`}
    >
      <option value="" disabled>
        Select your option
      </option>
      {options.map((option) => {
        if (typeof option === "object" && option !== null) {
          return (
            <option className="" key={option.value} value={option.value}>
              {option.label || formatLabel(option.value)}
            </option>
          );
        }
        return (
          <option className="" key={option} value={option}>
            {formatLabel(option)}
          </option>
        );
      })}
    </select>
  </div>
);

export default SelectField;
