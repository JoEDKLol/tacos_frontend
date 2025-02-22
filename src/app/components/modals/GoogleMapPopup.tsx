

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";
import GoogleMap3 from "../googleMap/GoogleMap3";

const GoogleMapPopup = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  
  useEffect(() => {
    
    if(props.show){
      setBlock("visible transform translate-y-8 ease-out duration-700 ");
    }else{
      setBlock("invisible  ");
    }

  }, [props.show]);

  function close(){
    props.googleHandleModal(false);
    
  }

  

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className=" ">
        <div className=' fixed top-0 right-0 left-0 z-50 w-full h-[100vh] border flex justify-center items-center'>
          <div className={block +  "  w-[505px] h-[332px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 bg-white "}>
            <div className="flex justify-end h-[24px] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose/>
              </p>
            </div>
            <div className="">
              <GoogleMap3 setSearchText={props.setSearchText} searchText={props.searchText} setLatLng={props.setLatLng}
              googleMapType={props.googleMapType}
              mapSelectedRestaurantseq={props.mapSelectedRestaurantseq}
              setRestaurantListAddressFromGoogleMap={props.setRestaurantListAddressFromGoogleMap}
              />
            </div>
          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default GoogleMapPopup;



