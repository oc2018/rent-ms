"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import config from "@/lib/config";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const center = {
  lat: -0.0713,
  lng: 37.67,
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: config.env.gogleMapsApi,
  });

  if (loadError) {
    return <p>Error loading map</p>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker
          position={{
            lat: -0.0713,
            lng: 37.67,
          }}
        />
      </GoogleMap>
    </>
  );
};

export default Map;
