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
import HeaderUpdateMove from "@/app/components/common/HeaderUpdateMove";
import HomeUpdateMove from "@/app/components/common/HomeUpdateMove";

const Layout = () => {

  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const [hearderLayout, setHearderLayout] = useState<any>();
  const [homeLayout, setHomeLayout] = useState<any>();
  const [resLayoutYn, setResLayoutYn] = useState<boolean>(false);
  
  const [hearderLayoutYn, setHearderLayoutYn] = useState<boolean>(false);
  const [homeLayoutYn, setHomeLayoutYn] = useState<boolean>(false);

  const [restaurantName, setRestaurantName] = useState<string>("");

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
      // setHearderLayout(retObj.sendObj.resObj.header);
      
      setRestaurantName(retObj.sendObj.resObj.restaurantname);
      if(retObj.sendObj.resObj.header && retObj.sendObj.resObj.home){
        setHearderLayout(retObj.sendObj.resObj.header);
        setHomeLayout(retObj.sendObj.resObj.home);
        setHearderLayoutYn(true);
        setHomeLayoutYn(true);
      }else{
        // setHearderLayout(
        // {
        //   bgColor : "#ffffff", 
        //   headerHight : "70", 
        //   borderColor : "#000000", 
        //   headerBorderWidth : "1", 
        //   hearderType : "", 
        //   hearderImg : "b", 
        //   hearderThumbImg : "", 
        //   logoType : "b", 
        //   img : "", 
        //   thumbImg : "", 
        //   imageWidthSize : "50", 
        //   imageHeightSize : "50", 
        //   logoBoxBorderColor : "#000000", 
        //   logoBoxRadius : "10", 
        //   logoBoxBorderSize : "1", 
        //   logoSize : "15", 
        //   logoColor : "#ffffff", 
        //   logoBoxBgColor : "#ffffff", 
        //   logoBoxSize : "50", 
        //   logoBoxSizeHeigh : "50", 
        //   restaurantTitleSize : "20", 
        //   restaurantTitleColor : "#ffffff", 
        //   titleBoxBgColor : "#ffffff", 
        //   titleBoxSize : "150", 
        //   titleBoxSizeHeight : "50", 
        //   titleBoxBorderColor : "#000000", 
        //   titleBoxBorderSize : "1", 
        //   titleBoxRadius : "10", 
        //   menuBgColor : "#ffffff", 
        //   menuHeight : "40", 
        //   menuBorderColor : "#000000", 
        //   menuBorderWidth : "1", 
        //   menuTextSize : "15", 
        //   menuTextColor : "#000000", 
        //   menuItemPadding : "350", 
        //   menuBoxColor : "#ffffff", 
        //   menuTextBoxSize : "100", 
        //   menuTextBoxSizeHeight : "20", 
        //   menuBoxBorderColor : "#ffffff", 
        //   menuTextBorderWidth : "1", 
        //   menuTextBoxRadiusSize : "10", 
        //   logoText : "", 
        //   titleText : "", 
        //   menuText1 : "HOME", 
        //   menuText2 : "ABOUT", 
        //   menuText3 : "MENU"
        // });
        // setHomeLayout({
        //   bgColor:"#ffffff",
        //   bgColorQuill:"#ffffff", 
        //   content:"", 
        //   quillWidth:"70",
        //   quillTop:"10"
        // });

        if(retObj.sendObj.resObj.header){
          setHearderLayout(retObj.sendObj.resObj.header);
          setHearderLayoutYn(true);
        }else{
          setHearderLayoutYn(false);
        }

        if(retObj.sendObj.resObj.home){
          setHomeLayout(retObj.sendObj.resObj.home);
          setHomeLayoutYn(true);
        }else{
          setHomeLayoutYn(false);
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
          (hearderLayoutYn)?<Header hearderLayout={hearderLayout} restaurantName={restaurantName}/>
          :
          <div>
            <HeaderUpdateMove name={restaurantName}/>
          </div>
        }

        {
          (homeLayoutYn)?<Main homeLayout={homeLayout}/>
          :
          <div>
            <HomeUpdateMove name={restaurantName}/>
          </div>
        }
        </div>
        :<HomeMove/>
      }

      
    </>
  );
};

export default Layout