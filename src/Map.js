import React, { useCallback, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker,DirectionsRenderer } from "@react-google-maps/api";





const center = {
  lat: 24.6005,
  lng: 12.8322,
};

function Map() {
  const { isLoaded } = useJsApiLoader({ id: "ram", googleMapsApiKey: "AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY" });

  const [start, setStart] = useState(null);
 // console.log(start)
  const [end, setEnd] = useState(null);
  console.log(end)

  const inf1 = useRef();
  const inf2 = useRef();

 async function change() {
    const startLocation = inf1.current.value;
    const endLocation = inf2.current.value;

    console .log(startLocation);
    console.log(endLocation);

    if (!startLocation || !endLocation) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setEnd(result);
      } else {
        console.error(`Directions request failed with status: ${status}`);
      }
    });
  }

  function clear() {
    setEnd(null);
    inf1.current.value = "";
    inf2.current.value = "";
  }

  const onloadcallback = useCallback((loadmap) => {
    if (!start) {
      setStart(loadmap);
    }
  }, [start]);

  return isLoaded ? (
    <div>
      <label>Start</label>
      <input type="text" placeholder="Enter starting point" ref={inf1} /><br />
      <label>End</label>
      <input type="text" placeholder="End point" ref={inf2} /><br />
      <button onClick={change}>Search</button><br />
      <button onClick={clear}>Clear</button>

      <GoogleMap
        center={center}
        zoom={7}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={onloadcallback}
      >
        <Marker position={center} />
        {end && (
          <DirectionsRenderer directions={end} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Map;
