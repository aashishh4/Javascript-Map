import React, { useCallback, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";

const center = {
  lat: 24.6005,
  lng: -40.8322,
};

function Map3() {
  const { isLoaded } = useJsApiLoader({
    id: "ram",
    googleMapsApiKey: "AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY", // Replace with your Google Maps API key
  });

  const [directions, setDirections] = useState(null);
  console.log(directions)
  const [startInputValue, setStartInputValue] = useState(null);
  console.log(startInputValue)
  const [endInputValue, setEndInputValue] = useState(null);
  console.log(endInputValue)

  const onloadcallback = useCallback((loadmap) => {
    if (!directions) {
      setDirections(loadmap);
    }
  }, [directions]);

  async function handleDirections() {
    alert("hello")
    if (startInputValue && endInputValue) {
      const directionsService = new window.google.maps.DirectionsService();

      const request = {
        origin: startInputValue, // Use the address string
        destination: endInputValue, // Use the address string
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error(`Directions request failed with status: ${status}`);
        }
      });
    }
  }

  function clear() {
    alert("ok")
    setStartInputValue(null);
    setEndInputValue(null);
    setDirections(null);
  }

  return isLoaded ? (
    <div>
      <label>Start</label>
      <Autocomplete
        onLoad={onloadcallback}
        onPlaceSelected={(place) => {
          setStartInputValue(place.formatted_address);
        }}
        types={["geocode"]}
      />

      <label>End</label>
      <Autocomplete
        onLoad={onloadcallback}
        onPlaceSelected={(place) => {
          setEndInputValue(place.formatted_address);
        }}
        types={["geocode"]}
      />

      <br />
      <button onClick={handleDirections}>Search</button>
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
      >
        <Marker position={center} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Map3;
