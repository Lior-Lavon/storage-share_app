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

const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="px-4 py-3 h-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      <option value="" disabled>
        Select your option
      </option>
      {options.map((option) => {
        if (typeof option === "object" && option !== null) {
          return (
            <option className="" key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        }
        return (
          <option className="" key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  </div>
);

export default SelectField;
