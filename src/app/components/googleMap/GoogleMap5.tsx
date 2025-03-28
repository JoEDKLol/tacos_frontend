import {
  useLoadScript,
  GoogleMap,
  MarkerF,
} from '@react-google-maps/api';
// import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const GoogleMap5 = (props:any) => {
  const [lat, setLat] = useState(props.latLng.lat);
  const [lng, setLng] = useState(props.latLng.lng);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      disableDoubleClickZoom:true
    }),
    []
  );

  useEffect(() => {
    
    if(!lat || !lng){
      setLat(37.7833141);
      setLng(-122.2030887);
    }
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const handlerMapClick = (e:any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLat(lat);
    setLng(lng);
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      
      <div className='relative flex justify-center h-[250px]  w-full'>

        
        <div className='absolute z-0' >

          <div className="absolute w-full top-1 left-0  z-10 flex justify-center">
            {/* render Places Auto Complete and pass custom handler which updates the state */}
            
            <PlacesAutocomplete
              lat={lat}
              lng={lng}
              setSearchText={props.setSearchText}
              setLatLng={props.setLatLng}
              googleMapType={props.googleMapType}
              mapSelectedRestaurantseq={props.mapSelectedRestaurantseq}
              setRestaurantListAddressFromGoogleMap={props.setRestaurantListAddressFromGoogleMap}

              onAddressSelect={(address) => {
                getGeocode({ address: address }).then((results) => {
                  const { lat, lng } = getLatLng(results[0]);
                  setLat(lat);
                  setLng(lng);
                });
              }}
            />
            
          </div>
        
          <GoogleMap
            options={mapOptions}
            zoom={16}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '250px', height: '250px', borderRadius : "12px" }}
            // onLoad={() => console.log('Map Loaded')}
            onClick={(e)=>handlerMapClick(e)}
          >
            <MarkerF
              position={mapCenter}
              // onLoad={() => console.log('Marker Loaded')}
            />

           
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};





const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  lat:any
  lng:any
  setSearchText : any
  setLatLng : any
  googleMapType : any 
  mapSelectedRestaurantseq : any
  setRestaurantListAddressFromGoogleMap : any 
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'us' } },
    debounce: 300,
    cache: 86400,
  });
  
  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;
      
      return (
        <li
          className='p-1 border-b border-[#006341] text-[#006341] bg-white
          hover:text-white hover:bg-[#006341]'
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  

  return (
    <div className=" w-full ">
      <div className='flex justify-center mb-1'>
        <input
          value={value}
          className=" w-[100px] text-xs border border-[#006341] text-[#006341]  outline-none px-2 py-1 rounded"
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          // placeholder="123 Stariway To Heaven"
        />
      {/* <button 
      onClick={()=>applyClickHandler()}
      className=' text-[8px] font-bold border border-[#006341] text-[#006341] bg-white px-1 ms-1 rounded-lg hover:bg-[#006341] hover:text-white'>APPLY</button> */}
      </div>
      {status === 'OK' && (
      <div className='flex justify-center '>
        <ul className=" p-1 w-[80%] border border-[#006341] text-xs bg-white">{renderSuggestions()}</ul>
      </div>
      )}
    </div>
  );
};

export default GoogleMap5;