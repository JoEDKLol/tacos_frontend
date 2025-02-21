'use client';
import CommonHearder from "@/app/components/common/CommonHeader";
import Header from "./_componets/Header";
import Main from "./_componets/Main";


import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeMove from "@/app/components/common/HomeMove";

const Layout = () => {

  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const [hearderLayout, setHearderLayout] = useState<any>();
  const [homeLayout, setHomeLayout] = useState<any>();
  const [resLayoutYn, setResLayoutYn] = useState<boolean>(false);
  

  useEffect(()=>{
    rastaurantLayoutSearch();
  },[])

  async function rastaurantLayoutSearch(){
    const restaurantName = decodeURIComponent(path.split("/")[1]);
    
    const obj = {
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "res/restaurantlayoutsearch", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
    if(retObj.sendObj.success === "y"){
      // setHearderLayout(retObj.sendObj.resObj.header);
      setHearderLayout(retObj.sendObj.resObj.header);
      setHomeLayout(retObj.sendObj.resObj.home);
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
        <>
        <Header hearderLayout={hearderLayout}/>
        <Main homeLayout={homeLayout}/>
        </>
        :<HomeMove/>
      }

      
    </>
  );
};

export default Layout