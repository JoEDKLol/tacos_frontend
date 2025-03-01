'use client';
import CommonHearder from "@/app/components/common/CommonHeader";

import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeMove from "@/app/components/common/HomeMove";
import HeaderUpdateMove from "@/app/components/common/HeaderUpdateMove";
import Header from "../_componets/Header";
import Main from "./Main";
import AboutUpdateMove from "@/app/components/common/AboutUpdateMove";

const Layout = () => {

  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const [hearderLayout, setHearderLayout] = useState<any>();
  const [layout, setLayout] = useState<any>();
  const [resLayoutYn, setResLayoutYn] = useState<boolean>(false);
  
  const [hearderLayoutYn, setHearderLayoutYn] = useState<boolean>(false);
  const [layoutYn, setLayoutYn] = useState<boolean>(false);

  const [restaurantName, setRestaurantName] = useState<string>("");
  const [latLng, setLatLng] = useState<object>({});
  const [address, setAddress] = useState<string>("");

  useEffect(()=>{
    rastaurantLayoutSearch();
  },[])

  async function rastaurantLayoutSearch(){
    const restaurantName = decodeURIComponent(path.split("/")[1]);
    
    const obj = {
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "res/restaurantlayoutsearch", obj, "", false, true, screenShow, errorShow); 
    if(retObj.sendObj.success === "y"){
      setHearderLayout(retObj.sendObj.resObj.header);
      
      setRestaurantName(retObj.sendObj.resObj.restaurantname);
      if(retObj.sendObj.resObj.header && retObj.sendObj.resObj.about){
        setHearderLayout(retObj.sendObj.resObj.header);
        setLayout(retObj.sendObj.resObj.about);
        setLatLng(retObj.sendObj.resObj.latLng);
        // console.log("??????" + retObj.sendObj.resObj.address);
        setAddress(retObj.sendObj.resObj.address);
        setHearderLayoutYn(true);
        setLayoutYn(true);
      }else{
        if(retObj.sendObj.resObj.header){
          setHearderLayout(retObj.sendObj.resObj.header);
          setHearderLayoutYn(true);
        }else{
          setHearderLayoutYn(false);
        }

        if(retObj.sendObj.resObj.about){
          
          setLayout(retObj.sendObj.resObj.about);
          setLatLng(retObj.sendObj.resObj.latLng);
          setAddress(retObj.sendObj.resObj.address);
          setLayoutYn(true);
        
        }else{
          setLayoutYn(false);
        }

      }
        setResLayoutYn(true);
    }else{
      setResLayoutYn(false);
    }

  }
  
  return(
    <>
      <CommonHearder/>

      {
        (resLayoutYn)?
        <div>
        {
          (hearderLayoutYn)?<Header hearderLayout={hearderLayout}/>
          :
          <div>
            <HeaderUpdateMove name={restaurantName}/>
          </div>
        }

        {
          (layoutYn)?<Main aboutLayout={layout} latLng={latLng} address={address} />
          :
          <div>
            <AboutUpdateMove name={restaurantName}/>
          </div>
        }
        </div>
        :<HomeMove/>
      }

      
    </>
  );
};

export default Layout