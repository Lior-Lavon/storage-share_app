import React, { useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({
  label,
  setFormattedAddress,
  setCoordinate,
  panTo,
  onFocus,
}) => {
  const inputRef = useRef(null);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setFormattedAddress(address);
    setCoordinate({ lat, lng });
    if (panTo != undefined) {
      panTo({ lat, lng });
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="relative w-full">
      <label className="text-base font-medium">{label}</label>
      <Combobox onSelect={handleSelect} className="mt-1">
        <ComboboxInput
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={onFocus}
          disabled={!ready}
          className="w-full pl-4 pr-8 py-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          placeholder="Search address"
        />
        <ComboboxPopover
          portal={false}
          className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1"
        >
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="px-4 py-2 hover:bg-violet-100 cursor-pointer"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete;
