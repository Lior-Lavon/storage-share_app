import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Combobox } from "@headlessui/react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = forwardRef(
  (
    {
      label,
      setFormattedAddress,
      setCoordinate,
      panTo,
      onFocus,
      error = false,
      initialAddress = "",
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue("");
        setFormattedAddress("");
        setCoordinate(null);
        clearSuggestions();
      },
    }));

    // Set initial value on mount or when initialAddress changes
    useEffect(() => {
      if (initialAddress) {
        setValue(initialAddress, false); // false to avoid fetching suggestions immediately
      }
    }, [initialAddress, setValue]);

    const handleSelect = async (address) => {
      setValue(address);
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
        <Combobox value={value} onChange={handleSelect} nullable>
          <div className="relative mt-1">
            <Combobox.Input
              ref={inputRef}
              className={`w-full pl-4 pr-8 py-2 bg-gray-100  rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${
                !error ? "border border-gray-100" : "border border-red-500"
              }`}
              onChange={(e) => setValue(e.target.value)}
              onFocus={onFocus}
              disabled={!ready}
              displayValue={(address) => address}
              placeholder="Search address"
            />
            {status === "OK" && (
              <Combobox.Options className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                {data.map(({ place_id, description }) => (
                  <Combobox.Option
                    key={place_id}
                    value={description}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${
                        active
                          ? "bg-violet-100 text-violet-900"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {description}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
    );
  }
);

export default PlacesAutocomplete;
