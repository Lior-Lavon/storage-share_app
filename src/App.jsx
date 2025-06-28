import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import {
  ClearCache,
  Dashboard,
  Landing,
  NotFound,
  ProtectiveRoute,
} from "./pages/index";
import history from "./utils/history";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { pingUser } from "./features/user/userSlice";
//
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

//
import { useRef } from "react";

import {
  ForgotPasswordView,
  HardDeleteUser,
  LoginView,
  PlacesAutocomplete,
  ResetPassword,
  SignupView,
  VerifyEmail,
} from "./components";

const libraries = ["places"];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pingUser());
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  // return <Map />;

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path="/"
          element={<ProtectiveRoute>{<Dashboard />}</ProtectiveRoute>}
        >
          {/* <Route index element={<StartPage />} /> */}
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/clear" element={<ClearCache />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<SignupView />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/verify_email/:token" element={<VerifyEmail />} />
        <Route path="/forgot_password" element={<ForgotPasswordView />} />
        <Route path="/delete_user" element={<HardDeleteUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

const Map = () => {
  // the address user has selected from the dropdown
  const center = useMemo(() => ({ lat: 52.2770243, lng: 4.8558283 }));
  const [selected, setSelected] = useState({ lat: 52.2770243, lng: 4.8558283 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapLoaded(true); // ✅ Now we know it's safe to call panTo
  };

  const panTo = ({ lat, lng }) => {
    if (mapRef.current) {
      console.log("Panning to:", lat, lng, "Map loaded?", !!mapRef.current);
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="places-container">
        {/* Only pass panTo if map is loaded */}
        <PlacesAutocomplete
          setSelected={setSelected}
          panTo={mapLoaded ? panTo : () => {}}
        />
      </div>

      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="w-full h-full"
        onLoad={handleMapLoad}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

// const PlacesAutocomplete = ({ setSelected, panTo }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//     panTo({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="w-[50%] p-[.5rem] border border-gray-400 rounded-xl"
//         placeholder="Search address"
//       />
//       <ComboboxPopover>
//         <ComboboxList className="bg-white">
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };
