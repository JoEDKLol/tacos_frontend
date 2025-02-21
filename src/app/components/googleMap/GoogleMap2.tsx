// components/Map.js
import React, { useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Search from './GoogleMapSearch';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};


const center = {
  lat: 0,
  lng: 0,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  const mapRef = useRef<any>(null);
  const panTo = useCallback(({ lat, lng }:any) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const onMapLoad = useCallback((map:any) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
      >
      </GoogleMap>
    </div>
  );
};

export default Map;