import React, { useRef, useState, useCallback } from "react";
import {
  StandaloneSearchBox,
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";

const libraries = ["places"];

const center = {
  lat: 24.6005,
  lng: 80.8322,
};

const Map3 = () => {
  const inf1 = useRef(null);
  const inf2 = useRef(null);

  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null); 
  console.log(distance);
  const [directions, setDirections] = useState(null);
  console.log(directions);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "ram",
    googleMapsApiKey:  "AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY",
    libraries,
  });

  const changeDirections = () => {
    const startLocation = inf1.current.value;
    const endLocation = inf2.current.value;

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
        setDirections(result);
        calculateDistance(startLocation, endLocation);
      } else {
        console.error(`Directions request failed with status: ${status}`);
      }
    });
  };

  const calculateDistance = (startLocation, endLocation) => {
    const distanceService = new window.google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [startLocation],
        destinations: [endLocation],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const element = response.rows[0].elements[0];
          if (element.status === "OK") {
            const distance = element.distance.text;
            setDistance(distance);
          } else {
            console.error("Error calculating distance:", element.status);
          }
        } else {
          console.error("Error calculating distance:", status);
        }
      }
    );
  };

  const clearDirections = () => {
    setDirections(null);
    setDistance(null);
    inf1.current.value = "";
    inf2.current.value = "";
  
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  return (
    isLoaded ? (
      <div>
        <label>Start</label>
        <Autocomplete
          apiKey="AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY"
          onPlaceSelected={(place) => {
            inf1.current.value = place.formatted_address;
          }}
          ref={inf1}
        />

        <label>End</label>
        <Autocomplete
          apiKey="AIzaSyAzWKGxZZskJtVG-nHHScjFV1K7E8MaxHY"
          onPlaceSelected={(place) => {
            inf2.current.value = place.formatted_address;
          }}
          ref={inf2}
        /><br/>
        <div>Distance: {distance}</div>

        <button onClick={changeDirections}>Search</button>
        <br />
        <button onClick={clearDirections}>Clear</button>

        

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
          onLoad={onLoad}
        >
          <Marker position={center} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    ) : (
      <div>{loadError ? "Error loading Google Maps API" : "Loading..."}</div>
    )
  );
};

export default Map3;




