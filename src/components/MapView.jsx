import React, { useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapView = ({ marker, additionalClass, showControls }) => {
  const [selected, setSelected] = useState({
    lat: 52.2770243,
    lng: 4.8558283,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapLoaded(true); // ✅ Now we know it's safe to call panTo
  };

  return (
    <div className={`w-full ${additionalClass} bg-white rounded-2xl`}>
      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="w-full h-full"
        onLoad={handleMapLoad}
        options={{
          mapTypeControl: showControls,
          streetViewControl: showControls,
          fullscreenControl: showControls,
          scaleControl: showControls,
          rotateControl: showControls,
          zoomControl: showControls,
          disableDefaultUI: true, // 🚫 disables ALL UI controls
          tilt: 0, // ensures map is flat (no 45° view)
        }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

export default MapView;
