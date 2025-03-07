'use client';
import CommonHearder from "@/app/components/common/CommonHeader";

import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeMove from "@/app/components/common/HomeMove";
import HeaderUpdateMove from "@/app/components/common/HeaderUpdateMove";
import Header from "../_componets/Header";
import Main from "./Main";
import MenuUpdateMove from "@/app/components/common/MenuUpdateMove";
import { transaction } from "@/app/utils/axios";


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
  


  useEffect(()=>{
    rastaurantLayoutSearch();
    // categorySearch();
    // menuSearch();
    // console.log("???????????????????????");

  },[])

  async function rastaurantLayoutSearch(){
    const restaurantName = decodeURIComponent(path.split("/")[1]);
    
    const obj = {
      restaurantname : restaurantName, 
    }

    const retObj = await transaction("get", "res/restaurantlayoutsearch", obj, "", false, true, screenShow, errorShow); 
    if(retObj.sendObj.success === "y"){
      console.log(retObj.sendObj.resObj);
      setHearderLayout(retObj.sendObj.resObj.header);
      
      setRestaurantName(retObj.sendObj.resObj.restaurantname);
      if(retObj.sendObj.resObj.header && retObj.sendObj.resObj.menu){
        setHearderLayout(retObj.sendObj.resObj.header);
        setLayout(retObj.sendObj.resObj.menu);
        setHearderLayoutYn(true);
        setLayoutYn(true);
      }else{
        if(retObj.sendObj.resObj.header){
          setHearderLayout(retObj.sendObj.resObj.header);
          setHearderLayoutYn(true);
        }else{
          setHearderLayoutYn(false);
        }

        if(retObj.sendObj.resObj.menu){
          setLayout(retObj.sendObj.resObj.menu);
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
          (layoutYn)?<Main menuLayout={layout} />
          :
          <div>
            <MenuUpdateMove name={restaurantName}/>
          </div>
        }
        </div>
        :<HomeMove/>
      }

      
    </>
  );
};

export default Layout