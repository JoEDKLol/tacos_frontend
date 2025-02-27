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

const GoogleMap3 = (props:any) => {
  const [lat, setLat] = useState(37.7728591);
  const [lng, setLng] = useState(-122.2095387);

  
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      // scrollwheel: false,
      disableDoubleClickZoom:true
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });


  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);  
        });
    } else {
      setLat(37.7833141);
      setLng(-122.2030887);  
    }
  }, []);

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
      
      <div className='relative flex justify-center h-[300px]  w-full'>

        
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
            mapContainerStyle={{ width: '500px', height: '300px' }}
            // onLoad={() => console.log('Map Loaded')}
            onClick={(e)=>handlerMapClick(e)}
          >
            <MarkerF
              position={mapCenter}
              // onLoad={() => console.log('Marker Loaded')}
            />

            {/* {[1000, 2500].map((radius, idx) => {
              return (
                <CircleF
                  key={idx}
                  center={mapCenter}
                  radius={radius}
                  onLoad={() => console.log('Circle Load...')}
                  options={{
                    fillColor: radius > 1000 ? 'red' : 'green',
                    strokeColor: radius > 1000 ? 'red' : 'green',
                    strokeOpacity: 0.8,
                  }}
                />
              );
            })} */}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};



const PlacesAutocomplete = ({
  lat, 
  lng, 
  setSearchText, 
  setLatLng, 
  googleMapType, 
  mapSelectedRestaurantseq, 
  setRestaurantListAddressFromGoogleMap,
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

  function applyClickHandler(){
    if(googleMapType === "each"){
      setSearchText(value);
      setLatLng({lat:lat, lng:lng}); 
    }else{
      setRestaurantListAddressFromGoogleMap(mapSelectedRestaurantseq, {lat:lat, lng:lng}, value);
    }
  }

  return (
    <div className=" w-full ">
      <div className='flex justify-center mb-1'>
        <input
          value={value}
          className=" w-[300px] text-xs border border-[#006341] text-[#006341]  outline-none px-2 py-1 rounded"
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          // placeholder="123 Stariway To Heaven"
        />
      <button 
      onClick={()=>applyClickHandler()}
      className=' text-[8px] font-bold border border-[#006341] text-[#006341] bg-white px-1 ms-1 rounded-lg hover:bg-[#006341] hover:text-white'>APPLY</button>
      </div>
      {status === 'OK' && (
      <div className='flex justify-center '>
        <ul className=" p-1 w-[80%] border border-[#006341] text-xs bg-white">{renderSuggestions()}</ul>
      </div>
      )}
    </div>
  );
};

export default GoogleMap3;