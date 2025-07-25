// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { parseISO } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaRegCalendarAlt } from "react-icons/fa";

// const DatePickerField = ({
//   label,
//   name,
//   value,
//   onChange,
//   min,
//   max,
//   disabled = false,
//   className = "",
//   error = false,
// }) => {
//   // Convert string dates to Date objects for react-datepicker
//   const selectedDate = value ? parseISO(value) : null;
//   const minDate = min ? parseISO(min) : null;
//   const maxDate = max ? parseISO(max) : null;

//   const [open, setOpen] = useState(false);

//   // Wrap onChange to send date string back (yyyy-MM-dd)
//   const handleChange = (date) => {
//     console.log("DATE SELECTED:", date);
//     if (!date) {
//       onChange({ target: { name, value: "" } });
//       return;
//     }
//     const formattedDate = date.toISOString().split("T")[0];
//     setOpen(false);
//     onChange({ target: { name, value: formattedDate } });
//   };

//   return (
//     <div className={`w-full flex flex-col`}>
//       <div
//         className={`w-full relative rounded-lg ${
//           error ? "border border-red-500" : ""
//         }`}
//       >
//         <DatePicker
//           className="w-full bg-gray-100 px-2 py-2 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
//           selected={selectedDate}
//           onChange={handleChange}
//           minDate={minDate}
//           maxDate={maxDate}
//           disabled={disabled}
//           placeholderText="dd/mm/yyyy"
//           dateFormat="dd/MM/yyyy"
//           name={name}
//           readOnly
//           onInputClick={() => setOpen(true)}
//           open={open}
//           onCalendarClose={() => setOpen(false)}
//           onCalendarOpen={() => setOpen(true)}
//           shouldCloseOnSelect={true} // default, but keep it explicit
//           onClickOutside={() => setOpen(false)} // <- this is crucial
//           popperClassName="z-50"

//           // withPortal
//         />
//         <FaRegCalendarAlt
//           className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none"
//           size={18}
//         />
//       </div>
//     </div>
//   );
// };

// export default DatePickerField;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full bg-gray-100 px-2 py-2 rounded-lg border border-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
  >
    {value || <span className="text-gray-400">{placeholder}</span>}
  </div>
));

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className = "",
  error = false,
}) => {
  const selectedDate = value ? parseISO(value) : null;
  const minDate = min ? parseISO(min) : null;
  const maxDate = max ? parseISO(max) : null;

  const [open, setOpen] = useState(false);

  const handleChange = (date) => {
    if (!date) {
      onChange({ target: { name, value: "" } });
      return;
    }
    const formattedDate = date.toISOString().split("T")[0];
    setOpen(false); // Close the calendar after date select
    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className={`w-full relative rounded-lg ${
          error ? "border border-red-500" : ""
        }`}
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          placeholderText="dd/mm/yyyy"
          dateFormat="dd/MM/yyyy"
          open={open}
          onCalendarOpen={() => setOpen(true)}
          onCalendarClose={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
          shouldCloseOnSelect
          popperClassName="z-50"
          customInput={<CustomInput />}
        />
        <FaRegCalendarAlt
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
};

export default DatePickerField;
