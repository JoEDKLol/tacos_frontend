// components/Search.js
import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries:any = ["places"];

const Search = ({ panTo }:any) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState<any>(null);

  const onLoad = (autocomplete:any) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error("No geometry found for the selected place");
      }
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Autocomplete 
        onLoad={onLoad} 
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search a location"
        />
      </Autocomplete>
    </div>
  );
};

export default Search;