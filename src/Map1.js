import React, { useCallback, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker,DirectionsRenderer } from "@react-google-maps/api";

import Autocomplete from "react-google-autocomplete";

const libraries = ['places'];




const center = {
  lat: 20.5937,
  lng: 78.9629
};

function Map1() {
  const { isLoaded,loadError } = useJsApiLoader({ id: "ram", googleMapsApiKey: "AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY",libraries });

  const [start, setStart] = useState(null);
 
  const [end, setEnd] = useState(null);
  
  
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
  setStart(null);
}


  const onloadcallback = useCallback((loadmap) => {
    if (!start) {
      setStart(loadmap);
    }
  }, [start]);

  return isLoaded ? (
    <div>
       <label>Start</label>
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onPlaceSelected={(place) => {
              inf1.current.value = place.formatted_address;
            }}
            ref={inf1}
          />

          <label>End</label>
          <Autocomplete
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onPlaceSelected={(place) => {
              inf2.current.value = place.formatted_address;
            }}
            ref={inf2}
          /><br/>
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
    <div>{loadError ? "Error loading Google Maps API" : "Loading..."}</div>
  );
}

export default Map1;
