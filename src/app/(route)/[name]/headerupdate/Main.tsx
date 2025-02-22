'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import LoginMove from "@/app/components/common/LoginMove";
import userState from "@/app/store/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { ButtonBase, ButtonRefresh, ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import { usePathname } from "next/navigation";
import { transactionAuth } from "@/app/utils/axiosAuth";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import imageCompression from "browser-image-compression";
import { transactionFile } from "@/app/utils/axiosFile";
import ManageMove from "@/app/components/common/ManageMove";


const Main = () => {

  const userStateSet = userState();
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); 
  const [borderColorButton, setBorderColorButton] = useState<string>("#000000"); 

  const [bgColor, setBgColor] = useState<string>(""); 
  const [borderColor, setBorderColor] = useState<string>("#000000"); 
  const [headerBorderWidth, setHeaderBorderWidth] = useState<string>("1"); 
  

  const [titleColorButton, setTitleColorButton] = useState<string>("#ffffff");
  const [restaurantTitleColor, setRestaurantTitleColor] = useState<string>(""); 
  const [restaurantTitleSize, setRestaurantTitleSize] = useState<string>("20"); 
  const [titleBoxSize, setTitleBoxSize] = useState<string>("150");
  const [titleBoxSizeHeight, setTitleBoxSizeHeight] = useState<string>("50"); 
  const [titleBoxBorderSize, setTitleBoxBorderSize] = useState<string>("1"); 

  const [titleBoxButton, setTitleBoxButton] = useState<string>("#ffffff"); 
  const [titleBoxBorderButton, setTitleBoxBorderButton] = useState<string>("#ffffff"); 
  const [titleBoxBgColor, setTitleBoxBgColor] = useState<string>("#ffffff"); 
  const [titleBoxBorderColor, setTitleBoxBorderColor] = useState<string>("#000000"); 

  const [headerHight, setHeaderHight] = useState<string>("70"); 
  const [logoType, setLogoType] = useState<string>("b"); //logo 타입
  const [hearderType, setHearderType] = useState<string>("b"); //hearder bg 타입

  const [imageWidthSize, setImageWidthSize] = useState<string>("50");
  const [imageHeightSize, setImageHightSize] = useState<string>("50");

  const [logoColorButton, setLogoColorButton] = useState<string>("#ffffff");
  const [logoColor, setLogoTitleColor] = useState<string>(""); 
  const [logoSize, setLogoSize] = useState<string>("15"); 
  
  const [logoBoxSize, setlogoBoxSize] = useState<string>("50"); 
  const [logoBoxBorderSize, setLogoBoxBorderSize] = useState<string>("1"); 
  const [logoBoxButton, setLogoBoxButton] = useState<string>("#ffffff"); 
  const [logoBoxBorderButton, setLogoBoxBorderButton] = useState<string>("#ffffff"); 
  const [logoBoxBgColor, setLogoBoxBgColor] = useState<string>("#ffffff"); 
  const [logoBoxBorderColor, setLogoBoxBorderColor] = useState<string>("#000000"); 

  const [logoBoxSizeHeigh, setlogoBoxSizeHeigh] = useState<string>("50"); 

  const [logoBoxRadius, setlogoBoxRadius] = useState<string>("10"); 
  const [titleBoxRadius, setTitleBoxRadius] = useState<string>("10"); 

  const [img, setImg] = useState<any>("");
  const [hearderImg, setHearderImg] = useState<any>("");
  const [thumbImg, setThumbImg] = useState<any>("");
  const [hearderThumbImg, setHearderThumbImg] = useState<any>("");

  const [menuBgColor, setMenuBgColor] = useState<string>(""); 
  const [menuBgColorButton, setMenuBgColorButton] = useState<string>("#ffffff"); 
  const [menuBorderColor, setMenuBorderColor] = useState<string>(""); 
  const [menuBorderColorButton, setMenuBorderColorButton] = useState<string>("#ffffff"); 
  const [menuTextColor, setMenuTextColor] = useState<string>(""); 
  const [menuTextColorButton, setMenuTextColorButton] = useState<string>("#ffffff"); 
  const [menuBoxColor, setMenuBoxColor] = useState<string>(""); 
  const [menuBoxColorButton, setMenuBoxColorButton] = useState<string>("#ffffff"); 
  const [menuBoxBorderColor, setMenuBoxBorderColor] = useState<string>(""); 
  const [menuBoxBorderColorButton, setMenuBoxBorderColorButton] = useState<string>("#ffffff"); 


  const [menuHeight, setMenuHeight] = useState<string>("40"); 
  const [menuBorderWidth, setMenuBorderWidth] = useState<string>("1"); 
  const [menuTextSize, setMenuTextSize] = useState<string>("15");
  const [menuTextBoxSize, setMenuTextBoxSize] = useState<string>("100");
  const [menuTextBoxSizeHeight, setMenuTextBoxSizeHeight] = useState<string>("20"); 
  const [menuTextBoxRadiusSize, setMenuTextBoxRadiusSize] = useState<string>("10"); 
  const [menuTextBorderWidth, setMenuTextBorderWidth] = useState<string>("1"); 
  const [menuItemPadding, setMenuItemPadding] = useState<string>("350");

  const [logoText, setLogoText] = useState<string>("");
  const [titleText, setTitleText] = useState<string>("");
  const [menuText1, setMenuText1] = useState<string>("HOME");
  const [menuText2, setMenuText2] = useState<string>("ABOUT");
  const [menuText3, setMenuText3] = useState<string>("MENU");

  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [colorBox2, setColorBox2] = useState<string>("hidden");
  const [colorBox3, setColorBox3] = useState<string>("hidden");
  const [colorBox4, setColorBox4] = useState<string>("hidden");
  const [colorBox5, setColorBox5] = useState<string>("hidden");
  const [colorBox6, setColorBox6] = useState<string>("hidden");
  const [colorBox7, setColorBox7] = useState<string>("hidden");
  const [colorBox8, setColorBox8] = useState<string>("hidden");
  const [colorBox9, setColorBox9] = useState<string>("hidden");
  const [colorBox10, setColorBox10] = useState<string>("hidden");
  const [colorBox11, setColorBox11] = useState<string>("hidden");
  const [colorBox12, setColorBox12] = useState<string>("hidden");
  const [colorBox13, setColorBox13] = useState<string>("hidden");

  const [hearderLayoutYn, setHearderLayoutYn] = useState<boolean>(false);
  
  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);
  useEffect(()=>{
    if(userStateSet.userseq > 0){
      hearderLayoutSearch();
    }
  },[userStateSet.userseq])

  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  function borderColorApply(){
    setBorderColor(borderColorButton);
  }

  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  function borderInputOnchange(e:any){
    setBorderColorButton(e.target.value)
  }

  function titleColorApply(){
    setRestaurantTitleColor(titleColorButton);
  }

  function titleColorInputOnchage(e:any){
    setTitleColorButton(e.target.value)
  }
  function titleBoxColorApply(){
    setTitleBoxBgColor(titleBoxButton);
  }

  function titleBoxColorInputOnchage(e:any){
    setTitleBoxButton(e.target.value)
  }

  function titleBoxBorderColorApply(){
    setTitleBoxBorderColor(titleBoxBorderButton);
  }

  function titleBoxBorderColorInputOnchage(e:any){
    setTitleBoxBorderButton(e.target.value)
  }
//menu
  function menuBgColorApply(){
    setMenuBgColor(menuBgColorButton);
  }

  function menuBgColorInputOnchage(e:any){
    setMenuBgColorButton(e.target.value)
  }

  function menuBorderColorApply(){
    setMenuBorderColor(menuBorderColorButton);
  }

  function menuBorderColorInputOnchage(e:any){
    setMenuBorderColorButton(e.target.value)
  }

  function menuTextColorApply(){
    setMenuTextColor(menuTextColorButton);
  }

  function menuTextColorInputOnchage(e:any){
    setMenuTextColorButton(e.target.value)
  }

  function menuBoxColorApply(){
    setMenuBoxColor(menuBoxColorButton);
  }

  function menuBoxColorInputOnchage(e:any){
    setMenuBoxColorButton(e.target.value)
  }

  function menuBoxBorderColorApply(){
    setMenuBoxBorderColor(menuBoxBorderColorButton);
  }

  function menuBoxBorderColorInputOnchage(e:any){
    setMenuBoxBorderColorButton(e.target.value)
  }

  


  function titleSizeUp(){
    let menuSizeNum = Number(restaurantTitleSize);
    menuSizeNum++;
    setRestaurantTitleSize(menuSizeNum + "")
  }

  function titleSizeDown(){
    let menuSizeNum = Number(restaurantTitleSize);
    menuSizeNum--;
    if(menuSizeNum < 0) return;
    setRestaurantTitleSize(menuSizeNum + "")
  }

  function headerHeightUp(){
    let headerHeightSizeNum = Number(headerHight);
    headerHeightSizeNum = headerHeightSizeNum + 5;
    setHeaderHight(headerHeightSizeNum + "")
  }

  function headerHeightDown(){
    let headerHeightSizeNum = Number(headerHight);
    headerHeightSizeNum = headerHeightSizeNum - 5;
    if(headerHeightSizeNum < 0) return;
    setHeaderHight(headerHeightSizeNum + "")
  }

  function titleBoxSizeDown(){
    let titleBoxSizeNum = Number(titleBoxSize);
    titleBoxSizeNum = titleBoxSizeNum - 5;
    if(titleBoxSizeNum < 0) return;
    setTitleBoxSize(titleBoxSizeNum + "")
  }

  function titleBoxSizeUp(){
    let titleBoxSizeNum = Number(titleBoxSize);
    titleBoxSizeNum = titleBoxSizeNum + 5;
    setTitleBoxSize(titleBoxSizeNum + "")
  }

  function titleBoxHeightSizeDown(){
    let titleBoxSizeHeightNum = Number(titleBoxSizeHeight);
    titleBoxSizeHeightNum = titleBoxSizeHeightNum - 5;
    if(titleBoxSizeHeightNum < 0) return;
    setTitleBoxSizeHeight(titleBoxSizeHeightNum + "")
  }

  function titleBoxHeightSizeUp(){
    let titleBoxSizeHeightNum = Number(titleBoxSizeHeight);
    titleBoxSizeHeightNum = titleBoxSizeHeightNum + 5;
    setTitleBoxSizeHeight(titleBoxSizeHeightNum + "")
  }


  function headerBorderUp(){
    let headerBorderWidthNum = Number(headerBorderWidth);
    headerBorderWidthNum = headerBorderWidthNum + 1;
    setHeaderBorderWidth(headerBorderWidthNum + "")
  }

  function headerBorderDown(){
    let headerBorderWidthNum = Number(headerBorderWidth);
    headerBorderWidthNum = headerBorderWidthNum - 1;
    if(headerBorderWidthNum < 0) return;
    setHeaderBorderWidth(headerBorderWidthNum + "")
  }

  function titleBorderUp(){
    let titleBorderWidthNum = Number(titleBoxBorderSize);
    titleBorderWidthNum = titleBorderWidthNum + 1;
    setTitleBoxBorderSize(titleBorderWidthNum + "")
  }

  function titleBorderDown(){
    let titleBorderWidthNum = Number(titleBoxBorderSize);
    titleBorderWidthNum = titleBorderWidthNum - 1;
    if(titleBorderWidthNum < 0) return;
    setTitleBoxBorderSize(titleBorderWidthNum + "")
  }

  function imageWidthSizeUp(){
    let imageWidthSizeNum = Number(imageWidthSize);
    imageWidthSizeNum = imageWidthSizeNum + 3;
    setImageWidthSize(imageWidthSizeNum + "")
  }

  function imageWidthSizeDown(){
    let imageWidthSizeNum = Number(imageWidthSize);
    imageWidthSizeNum = imageWidthSizeNum - 3;
    if(imageWidthSizeNum < 0) return;
    setImageWidthSize(imageWidthSizeNum + "")
  }

  function imageHeightSizeUp(){
    let titleBorderWidthNum = Number(imageHeightSize);
    titleBorderWidthNum = titleBorderWidthNum + 3;
    setImageHightSize(titleBorderWidthNum + "")
  }

  function imageHeightSizeDown(){
    let titleBorderWidthNum = Number(imageHeightSize);
    titleBorderWidthNum = titleBorderWidthNum - 3;
    if(titleBorderWidthNum < 0) return;
    setImageHightSize(titleBorderWidthNum + "")
  }

  function imageTypeRadioOnchage(e:any){
    setLogoType(e.target.value)
  }

  function hearderTypeRadioOnchage(e:any){
    setHearderType(e.target.value)
  }

  function logoSizeUp(){
    let logoSizeNum = Number(logoSize);
    logoSizeNum = logoSizeNum + 3;
    setLogoSize(logoSizeNum + "")
  }

  function logoSizeDown(){
    let logoSizeNum = Number(logoSize);
    logoSizeNum = logoSizeNum - 3;
    if(logoSizeNum < 0) return;
    setLogoSize(logoSizeNum + "")
  }

  function logoBoxSizeDown(){
    let logoBoxSizeNum = Number(logoBoxSize);
    logoBoxSizeNum = logoBoxSizeNum - 3;
    if(logoBoxSizeNum < 0) return;
    setlogoBoxSize(logoBoxSizeNum + "")
  }

  function logoBoxSizeUp(){
    let logoBoxSizeNum = Number(logoBoxSize);
    logoBoxSizeNum = logoBoxSizeNum + 3;
    setlogoBoxSize(logoBoxSizeNum + "")
  }

  function logoBoxSizeHeightDown(){
    let logoBoxSizeHeighNum = Number(logoBoxSizeHeigh);
    logoBoxSizeHeighNum = logoBoxSizeHeighNum - 3;
    if(logoBoxSizeHeighNum < 0) return;
    setlogoBoxSizeHeigh(logoBoxSizeHeighNum + "")
  }

  function logoBoxSizeHeightUp(){
    let logoBoxSizeHeighNum = Number(logoBoxSizeHeigh);
    logoBoxSizeHeighNum = logoBoxSizeHeighNum + 3;
    setlogoBoxSizeHeigh(logoBoxSizeHeighNum + "")
  }


  /////////////////////////////////
  function logoColorApply(){
    setLogoTitleColor(logoColorButton);
  }

  function logoColorInputOnchage(e:any){
    setLogoColorButton(e.target.value)
  }
  function logoBoxColorApply(){
    setLogoBoxBgColor(logoBoxButton);
  }

  function logoBoxColorInputOnchage(e:any){
    setLogoBoxButton(e.target.value)
  }

  function logoBoxBorderColorApply(){
    setLogoBoxBorderColor(logoBoxBorderButton);
  }

  function logoBoxBorderColorInputOnchage(e:any){
    setLogoBoxBorderButton(e.target.value)
  }

  function logoBorderUp(){
    let logoBoxBorderSizeNum = Number(logoBoxBorderSize);
    logoBoxBorderSizeNum = logoBoxBorderSizeNum + 1;
    setLogoBoxBorderSize(logoBoxBorderSizeNum + "")
  }

  function logoBorderDown(){
    let logoBoxBorderSizeNum = Number(logoBoxBorderSize);
    logoBoxBorderSizeNum = logoBoxBorderSizeNum - 1;
    if(logoBoxBorderSizeNum < 0) return;
    setLogoBoxBorderSize(logoBoxBorderSizeNum + "")
  }

  function menuBoxSizeDown(){
    let menuTextBoxSizeNum = Number(menuTextBoxSize);
    menuTextBoxSizeNum = menuTextBoxSizeNum - 5;
    if(menuTextBoxSizeNum < 0) return;
    setMenuTextBoxSize(menuTextBoxSizeNum + "")
  }

  function menuBoxSizeUp(){
    let menuTextBoxSizeNum = Number(menuTextBoxSize);
    menuTextBoxSizeNum = menuTextBoxSizeNum + 5;
    setMenuTextBoxSize(menuTextBoxSizeNum + "")
  }

  function menuBoxHeightSizeDown(){
    let menuTextBoxSizeHeightNum = Number(menuTextBoxSizeHeight);
    menuTextBoxSizeHeightNum = menuTextBoxSizeHeightNum - 5;
    if(menuTextBoxSizeHeightNum < 0) return;
    setMenuTextBoxSizeHeight(menuTextBoxSizeHeightNum + "")
  }

  function menuBoxHeightSizeUp(){
    let menuTextBoxSizeHeightNum = Number(menuTextBoxSizeHeight);
    menuTextBoxSizeHeightNum = menuTextBoxSizeHeightNum + 5;
    setMenuTextBoxSizeHeight(menuTextBoxSizeHeightNum + "")
  }

  function deleteImg(){
    setImg("");
    setThumbImg("");
  }

  function deleteHearderImg(){
    setHearderImg("");
    setHearderThumbImg("");
  }

  function colorBoxClose(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("hidden");
    if(colorBoxNum === "2") setColorBox2("hidden");
    if(colorBoxNum === "3") setColorBox3("hidden");
    if(colorBoxNum === "4") setColorBox4("hidden");
    if(colorBoxNum === "5") setColorBox5("hidden");
    if(colorBoxNum === "6") setColorBox6("hidden");
    if(colorBoxNum === "7") setColorBox7("hidden");
    if(colorBoxNum === "8") setColorBox8("hidden");
    if(colorBoxNum === "9") setColorBox9("hidden");
    if(colorBoxNum === "10") setColorBox10("hidden");
    if(colorBoxNum === "11") setColorBox11("hidden");
    if(colorBoxNum === "12") setColorBox12("hidden");
    if(colorBoxNum === "13") setColorBox13("hidden");
  }

  function colorBoxOpen(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("block");
    if(colorBoxNum === "2") setColorBox2("block");
    if(colorBoxNum === "3") setColorBox3("block");
    if(colorBoxNum === "4") setColorBox4("block");
    if(colorBoxNum === "5") setColorBox5("block");
    if(colorBoxNum === "6") setColorBox6("block");
    if(colorBoxNum === "7") setColorBox7("block");
    if(colorBoxNum === "8") setColorBox8("block");
    if(colorBoxNum === "9") setColorBox9("block");
    if(colorBoxNum === "10") setColorBox10("block");
    if(colorBoxNum === "11") setColorBox11("block");
    if(colorBoxNum === "12") setColorBox12("block");
    if(colorBoxNum === "13") setColorBox13("block");
  }

  function logoBoxBoxRadiusUp(){
    let logoBoxRadiusNum = Number(logoBoxRadius);
    logoBoxRadiusNum = logoBoxRadiusNum + 1;
    setlogoBoxRadius(logoBoxRadiusNum + "")
  }

  function logoBoxBoxRadiusDown(){
    let logoBoxRadiusNum = Number(logoBoxRadius);
    logoBoxRadiusNum = logoBoxRadiusNum - 1;
    if(logoBoxRadiusNum < 0) return;
    setlogoBoxRadius(logoBoxRadiusNum + "")
  }

  function titleBoxBoxRadiusUp(){
    let logoBoxRadiusNum = Number(titleBoxRadius);
    logoBoxRadiusNum = logoBoxRadiusNum + 1;
    setTitleBoxRadius(logoBoxRadiusNum + "")
  }

  function titleBoxBoxRadiusDown(){
    let setlogoBoxRadiusNum = Number(titleBoxRadius);
    setlogoBoxRadiusNum = setlogoBoxRadiusNum - 1;
    if(setlogoBoxRadiusNum < 0) return;
    setTitleBoxRadius(setlogoBoxRadiusNum + "")
  }

  //menu
  function menuBorderUp(){
    let menuBorderWidthNum = Number(menuBorderWidth);
    menuBorderWidthNum = menuBorderWidthNum + 1;
    setMenuBorderWidth(menuBorderWidthNum + "")
  }

  function menuBorderDown(){
    let menuBorderWidthNum = Number(menuBorderWidth);
    menuBorderWidthNum = menuBorderWidthNum - 1;
    if(menuBorderWidthNum < 0) return;
    setMenuBorderWidth(menuBorderWidthNum + "")
  }

  function menuTextSizeUp(){
    let menuTextSizeNum = Number(menuTextSize);
    menuTextSizeNum++;
    setMenuTextSize(menuTextSizeNum + "")
  }

  function menuTextSizeDown(){
    let menuTextSizeNum = Number(menuTextSize);
    menuTextSizeNum--;
    if(menuTextSizeNum < 0) return;
    setMenuTextSize(menuTextSizeNum + "")
  }

  function menuBoxRadiusUp(){
    let menuTextBoxRadiusSizeNum = Number(menuTextBoxRadiusSize);
    menuTextBoxRadiusSizeNum = menuTextBoxRadiusSizeNum + 1;
    setMenuTextBoxRadiusSize(menuTextBoxRadiusSizeNum + "")
  }

  function menuBoxRadiusDown(){
    let menuTextBoxRadiusSizeNum = Number(menuTextBoxRadiusSize);
    menuTextBoxRadiusSizeNum = menuTextBoxRadiusSizeNum - 1;
    if(menuTextBoxRadiusSizeNum < 0) return;
    setMenuTextBoxRadiusSize(menuTextBoxRadiusSizeNum + "")
  }

  function menuBoxBorderUp(){
    let menuTextBorderWidthNum = Number(menuTextBorderWidth);
    menuTextBorderWidthNum = menuTextBorderWidthNum + 1;
    setMenuTextBorderWidth(menuTextBorderWidthNum + "")
  }

  function menuBoxBorderDown(){
    let menuTextBorderWidthNum = Number(menuTextBorderWidth);
    menuTextBorderWidthNum = menuTextBorderWidthNum - 1;
    if(menuTextBorderWidthNum < 0) return;
    setMenuTextBorderWidth(menuTextBorderWidthNum + "")
  }

  function menuHeightUp(){
    let menuHeightNum = Number(menuHeight);
    menuHeightNum = menuHeightNum + 5;
    setMenuHeight(menuHeightNum + "")
  }

  function menuHeightDown(){
    let menuHeightNum = Number(menuHeight);
    menuHeightNum = menuHeightNum - 5;
    if(menuHeightNum < 0) return;
    setMenuHeight(menuHeightNum + "")
  }

  function menuPaddingUp(){
    let menuItemPaddingNum = Number(menuItemPadding);
    menuItemPaddingNum = menuItemPaddingNum + 5;
    setMenuItemPadding(menuItemPaddingNum + "")
  }

  function menuPaddingDown(){
    let menuItemPaddingNum = Number(menuItemPadding);
    menuItemPaddingNum = menuItemPaddingNum - 5;
    if(menuItemPaddingNum < 0) return;
    setMenuItemPadding(menuItemPaddingNum + "")
  }

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      header : {
        bgColor : bgColor, 
        headerHight : headerHight, 
        borderColor : borderColor, 
        
        headerBorderWidth : headerBorderWidth, 
        hearderType : hearderType, 
        hearderImg : hearderImg, 
        hearderThumbImg : hearderThumbImg, 
        logoType : logoType, 
        img : img, 
        thumbImg : thumbImg, 
        imageWidthSize : imageWidthSize, 
        imageHeightSize : imageHeightSize, 
        logoBoxBorderColor : logoBoxBorderColor, 
        logoBoxRadius : logoBoxRadius, 
        logoBoxBorderSize : logoBoxBorderSize, 
        logoSize : logoSize, 
        logoColor : logoColor, 
        logoBoxBgColor : logoBoxBgColor, 
        logoBoxSize : logoBoxSize, 
        logoBoxSizeHeigh : logoBoxSizeHeigh, 
        restaurantTitleSize : restaurantTitleSize, 
        restaurantTitleColor : restaurantTitleColor, 
        titleBoxBgColor : titleBoxBgColor, 
        titleBoxSize : titleBoxSize, 
        titleBoxSizeHeight : titleBoxSizeHeight, 
        titleBoxBorderColor : titleBoxBorderColor, 
        titleBoxBorderSize : titleBoxBorderSize, 
        titleBoxRadius : titleBoxRadius, 
        menuBgColor : menuBgColor, 
        menuHeight : menuHeight, 
        menuBorderColor : menuBorderColor, 
        menuBorderWidth : menuBorderWidth, 
        menuTextSize : menuTextSize, 
        menuTextColor : menuTextColor, 
        menuItemPadding : menuItemPadding, 
        menuBoxColor : menuBoxColor, 
        menuTextBoxSize : menuTextBoxSize, 
        menuTextBoxSizeHeight : menuTextBoxSizeHeight, 
        menuBoxBorderColor : menuBoxBorderColor, 
        menuTextBorderWidth : menuTextBorderWidth, 
        menuTextBoxRadiusSize : menuTextBoxRadiusSize, 
        logoText : logoText, 
        titleText : titleText, 
        menuText1 : menuText1, 
        menuText2 : menuText2, 
        menuText3 : menuText3
      }
    }

    const retObj = await transactionAuth("post", "management/heardersave", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);

  }

  function logoTextOnChange(e:any){
    setLogoText(e.target.value);
  }

  function titleTextOnChange(e:any){
    setTitleText(e.target.value);
  }

  function menuText1OnChange(e:any){
    setMenuText1(e.target.value);
  }

  function menuText2OnChange(e:any){
    setMenuText2(e.target.value);
  }

  function menuText3OnChange(e:any){
    setMenuText3(e.target.value);
  }

  async function hearderLayoutSearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/hearderlayoutsearch", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === "y"){

      if(retObj.sendObj.resObj.header){
        setLayOut(retObj.sendObj.resObj.header);
      }else{
        setLayOut(
          {
            bgColor : "#ffffff", 
            headerHight : "70", 
            borderColor : "#000000", 
            headerBorderWidth : "1", 
            hearderType : "", 
            hearderImg : "b", 
            hearderThumbImg : "", 
            logoType : "b", 
            img : "", 
            thumbImg : "", 
            imageWidthSize : "50", 
            imageHeightSize : "50", 
            logoBoxBorderColor : "#000000", 
            logoBoxRadius : "10", 
            logoBoxBorderSize : "1", 
            logoSize : "15", 
            logoColor : "#000000", 
            logoBoxBgColor : "#ffffff", 
            logoBoxSize : "50", 
            logoBoxSizeHeigh : "50", 
            restaurantTitleSize : "20", 
            restaurantTitleColor : "#000000", 
            titleBoxBgColor : "#ffffff", 
            titleBoxSize : "150", 
            titleBoxSizeHeight : "50", 
            titleBoxBorderColor : "#000000", 
            titleBoxBorderSize : "1", 
            titleBoxRadius : "10", 
            menuBgColor : "#ffffff", 
            menuHeight : "40", 
            menuBorderColor : "#000000", 
            menuBorderWidth : "1", 
            menuTextSize : "15", 
            menuTextColor : "#000000", 
            menuItemPadding : "350", 
            menuBoxColor : "#ffffff", 
            menuTextBoxSize : "100", 
            menuTextBoxSizeHeight : "20", 
            menuBoxBorderColor : "#000000", 
            menuTextBorderWidth : "1", 
            menuTextBoxRadiusSize : "5", 
            logoText : "", 
            titleText : "", 
            menuText1 : "HOME", 
            menuText2 : "ABOUT", 
            menuText3 : "MENU"
          }
        );
      }
      setHearderLayoutYn(true);
    }else{
      setHearderLayoutYn(false);
    }

  }

  function setLayOut(layOutObj:any){

    // console.log(layOutObj);

    setBgColor(layOutObj.bgColor); setBgColorButton(layOutObj.bgColor);
    setHeaderHight(layOutObj.headerHight); 
    setBorderColor(layOutObj.borderColor); setBorderColorButton(layOutObj.borderColor);
    setHeaderBorderWidth(layOutObj.headerBorderWidth); 
    setHearderType(layOutObj.hearderType);
    setHearderImg(layOutObj.hearderImg); 
    setHearderThumbImg(layOutObj.hearderThumbImg); 
    setLogoType(layOutObj.logoType); 
    setImg(layOutObj.img); 
    setThumbImg(layOutObj.thumbImg); 
    setImageWidthSize(layOutObj.imageWidthSize); 
    setImageHightSize(layOutObj.imageHeightSize); 
    setLogoBoxBorderColor(layOutObj.logoBoxBorderColor); setLogoBoxBorderButton(layOutObj.logoBoxBorderColor);
    setlogoBoxRadius(layOutObj.logoBoxRadius); 
    setLogoBoxBorderSize(layOutObj.logoBoxBorderSize); 
    setLogoSize(layOutObj.logoSize); 
    setLogoTitleColor(layOutObj.logoColor); setLogoColorButton(layOutObj.logoColor);
    setLogoBoxBgColor(layOutObj.logoBoxBgColor); setLogoBoxButton(layOutObj.logoBoxBgColor);
    setlogoBoxSize(layOutObj.logoBoxSize); 
    setlogoBoxSizeHeigh(layOutObj.logoBoxSizeHeigh); 
    setRestaurantTitleSize(layOutObj.restaurantTitleSize); 
    setRestaurantTitleColor(layOutObj.restaurantTitleColor); setTitleColorButton(layOutObj.restaurantTitleColor);
    setTitleBoxBgColor(layOutObj.titleBoxBgColor); setTitleBoxButton(layOutObj.titleBoxBgColor);
    setTitleBoxSize(layOutObj.titleBoxSize); 
    setTitleBoxSizeHeight(layOutObj.titleBoxSizeHeight); 
    setTitleBoxBorderColor(layOutObj.titleBoxBorderColor); setTitleBoxBorderButton(layOutObj.titleBoxBorderColor);
    setTitleBoxBorderSize(layOutObj.titleBoxBorderSize); 
    setTitleBoxRadius(layOutObj.titleBoxRadius); 
    setMenuBgColor(layOutObj.menuBgColor); setMenuBgColorButton(layOutObj.menuBgColor);
    setMenuHeight(layOutObj.menuHeight); 
    setMenuBorderColor(layOutObj.menuBorderColor); setMenuBorderColorButton(layOutObj.menuBorderColor);
    setMenuBorderWidth(layOutObj.menuBorderWidth); 
    setMenuTextSize(layOutObj.menuTextSize); 
    setMenuTextColor(layOutObj.menuTextColor); setMenuTextColorButton(layOutObj.menuTextColor);
    setMenuItemPadding(layOutObj.menuItemPadding); 
    setMenuBoxColor(layOutObj.menuBoxColor); setMenuBoxColorButton(layOutObj.menuBoxColor);
    setMenuTextBoxSize(layOutObj.menuTextBoxSize); 
    setMenuTextBoxSizeHeight(layOutObj.menuTextBoxSizeHeight); 
    setMenuBoxBorderColor(layOutObj.menuBoxBorderColor); setMenuBoxBorderColorButton(layOutObj.menuBoxBorderColor);
    setMenuTextBorderWidth(layOutObj.menuTextBorderWidth); 
    setMenuTextBoxRadiusSize(layOutObj.menuTextBoxRadiusSize); 
    setLogoText(layOutObj.logoText); 
    setTitleText(layOutObj.titleText); 
    setMenuText1(layOutObj.menuText1); 
    setMenuText2(layOutObj.menuText2); 
    setMenuText3(layOutObj.menuText3);


  }

  async function hearderBgfileUploadHandler(e:any){

    setHearderImg("");
    setHearderThumbImg("");

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 
    const file = e.target.files[0]; 
    if(!file) return;
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      // maxWidthOrHeight: 500, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };

    try {

      const compressedFile = await imageCompression(file, options);
      
      const imgUploadRes = await transactionFile("res/fileUpload", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        // setImg(imgUploadRes.sendObj.resObj.img_url);
        // setThumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
        // restaurant[choosenIndex].img = imgUploadRes.sendObj.resObj.img_url;
        // restaurant[choosenIndex].thumbImg = imgUploadRes.sendObj.resObj.img_url;
        // setRestaurant([...restaurant]);
        setHearderImg(imgUploadRes.sendObj.resObj.img_url);
        setHearderThumbImg(imgUploadRes.sendObj.resObj.img_url);


      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {
 
    }
  }

  async function logofileUploadHandler(e:any){
    setImg("");
    setThumbImg("");

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 
    const file = e.target.files[0]; 
    if(!file) return;
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      // maxWidthOrHeight: 500, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };

    try {

      const compressedFile = await imageCompression(file, options);
      
      const imgUploadRes = await transactionFile("res/fileUpload", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        // setImg(imgUploadRes.sendObj.resObj.img_url);
        // setThumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
        // restaurant[choosenIndex].img = imgUploadRes.sendObj.resObj.img_url;
        // restaurant[choosenIndex].thumbImg = imgUploadRes.sendObj.resObj.img_url;
        // setRestaurant([...restaurant]);
        setImg(imgUploadRes.sendObj.resObj.img_url);
        setThumbImg(imgUploadRes.sendObj.resObj.img_url);


      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {

      
    }

  }

  return(
    <>  
      {
        (userStateSet.id)?
        <>
        <div className="">
          <div className="flex justify-center items-center h-10 bg-[#006341]">
            <p className="text-white text-xl">Header Update</p>
          </div>
        </div>

        {
          (!hearderLayoutYn)?
          <div>
            <ManageMove/>
          </div>
          :
          <div>
            <div className="flex justify-end p-1 border border-white bg-[#739e8f] ">
              <p className="flex justify-center items-center mr-1">
                <ButtonRefresh onClick={()=>hearderLayoutSearch()}/>
              </p>
              <p><ButtonBase onClick={()=>save()} name={"SAVE"}/> </p>
            </div>
            {/* hearder start */}
            <div className="">
              <div className={" relative top-0 left-0  w-[100%] z-10 " } style={{backgroundColor:bgColor, height:headerHight + "px", borderColor:borderColor , borderWidth:headerBorderWidth + "px"}}>
                
                <div className=" absolute w-full h-full -z-30">
                  {
                    (hearderType === "a")?
                    <p className="">
                      {
                        (hearderImg)?
                        <Image
                        src={hearderImg}
                        alt=""
                        quality={70} 
                        layout="fill"
                        loading="lazy"
                        style={{ objectFit: "cover"}}
                      />
                        :""
                      }
                    </p>
                    :""
                  }  
                
                </div>  
                
                <div className="absolute flex items-center h-[100%] w-full -z-20  ">
                  
                  <div className="m-5 flex justify-center items-center ">
                    {
                      (logoType === "a")?
                      <>
                      <div className=" flex items-center absolute left-3   "
                      style={{
                        width:imageWidthSize + "px" , 
                        height:imageHeightSize + "px", 
                        borderColor:logoBoxBorderColor, 
                        borderRadius:logoBoxRadius + "px", 
                        borderWidth:logoBoxBorderSize + "px",

                      }}
                      > 
                        {
                          img ? <Image
                          src={img}
                          alt=""
                          quality={70} 
                          layout="fill"
                          loading="lazy"
                          style={{ 
                            objectFit: "cover", 
                            borderRadius: logoBoxRadius + "px",
                            borderWidth:logoBoxBorderSize + "px",
                          }}
                          />
                          :<p className="w-full h-full flex justify-center items-center">IMG</p>
                        }
                      </div>
                      </>
                      :
                      <div className=" flex items-center absolute left-3   "
                      style={
                        {
                          fontSize:logoSize + "px", 
                          fontWeight:"bold", 
                          color:logoColor, 
                        }
                      }
                      > 
                        <input type="text" className="rounded text-center w-full border outline-none"
                        value={logoText}
                        onChange={(e)=>logoTextOnChange(e)}
                        style={{
                          backgroundColor:logoBoxBgColor, 
                          width:logoBoxSize + "px" , 
                          height:logoBoxSizeHeigh + "px",
                          borderColor:logoBoxBorderColor, 
                          borderWidth:logoBoxBorderSize + "px",
                          borderRadius:logoBoxRadius + "px"
                        }}
                        />
                      </div> 
                    }
                  </div>
                  <div className=" m-1 flex justify-center absolute " style={
                      {
                        fontSize:restaurantTitleSize + "px", 
                        fontWeight:"bold", 
                        left: "50%", 
                        marginLeft : -(Number(titleBoxSize)/2) + "px", 
                        color:restaurantTitleColor, 

                      }
                    }>
                    <input className=" p-1 rounded text-center outline-none"
                    value={titleText}
                    onChange={(e)=>titleTextOnChange(e)}
                    style={{
                      
                      backgroundColor:titleBoxBgColor, 
                      width:titleBoxSize + "px" , 
                      height:titleBoxSizeHeight + "px" ,
                      borderColor:titleBoxBorderColor, 
                      borderWidth:titleBoxBorderSize + "px",
                      borderRadius:titleBoxRadius + "px"
                    }}
                    ></input>
                  </div> 
                </div>
                
              </div>
            </div>
            {/* hearder end */}

            {/* menu start */}
            <div className=" flex  justify-center items-center " style={{backgroundColor:menuBgColor, height:menuHeight + "px", borderColor:menuBorderColor , borderWidth:menuBorderWidth + "px"}}>
              <div className="m-1 flex justify-between " style={
                {
                  fontSize:menuTextSize + "px", 
                  fontWeight:"bold", 
                  color:menuTextColor, 
                  width:menuItemPadding + "px" , 
                  
                }
              }>
                <input className=" p-1 rounded text-center outline-none "
                  value={menuText1}
                  onChange={(e)=>menuText1OnChange(e)}
                  style={{
                  backgroundColor:menuBoxColor, 
                  width:menuTextBoxSize + "px" , 
                  height:menuTextBoxSizeHeight + "px" ,
                  borderColor:menuBoxBorderColor, 
                  borderWidth:menuTextBorderWidth + "px",
                  borderRadius:menuTextBoxRadiusSize + "px"
                }}
                ></input>

                <input className=" p-1 rounded text-center outline-none "
                  value={menuText2}
                  onChange={(e)=>menuText2OnChange(e)}
                  style={{
                  backgroundColor:menuBoxColor, 
                  width:menuTextBoxSize + "px" , 
                  height:menuTextBoxSizeHeight + "px" ,
                  borderColor:menuBoxBorderColor, 
                  borderWidth:menuTextBorderWidth + "px",
                  borderRadius:menuTextBoxRadiusSize + "px"
                }}
                ></input>

                <input className=" p-1 rounded text-center outline-none "
                  value={menuText3}
                  onChange={(e)=>menuText3OnChange(e)}
                  style={{
                  backgroundColor:menuBoxColor, 
                  width:menuTextBoxSize + "px" , 
                  height:menuTextBoxSizeHeight + "px" ,
                  borderColor:menuBoxBorderColor, 
                  borderWidth:menuTextBorderWidth + "px",
                  borderRadius:menuTextBoxRadiusSize + "px"
                }}
                ></input>
              </div> 
            </div>
            {/* menu end */}
              
            
            {/* color button start */}
            <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
            2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
            ">
              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("1")} name={"Header-Color"}/>
                </p> 
                <div className={ colorBox1 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("1")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={bgColorButton} setColor={setBgColorButton}/>
                  </div> 
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={bgColorButton} 
                      onChange={(e)=>bgInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>bgColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div> 
                </div>
              </div>  

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                <ButtonSmall onClick={()=>colorBoxOpen("2")} name={"Border-Color"}/>
                </p>
                <div className={ colorBox2 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("2")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={borderColorButton} setColor={setBorderColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={borderColorButton}
                      onChange={(e)=>borderInputOnchange(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>borderColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div> 
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("3")} name={"Title-Color"}/>
                </p>
                <div className={ colorBox3 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("3")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={titleColorButton} setColor={setTitleColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={titleColorButton}
                      onChange={(e)=>titleColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>titleColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("4")} name={"Title-Box-Color"}/>
                </p>
                <div className={ colorBox4 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("4")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={titleBoxButton} setColor={setTitleBoxButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={titleBoxButton}
                      onChange={(e)=>titleBoxColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>titleBoxColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>  
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("5")} name={"Title-Box-Border-Color"}/>
                </p>
                <div className={ colorBox5 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("5")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={titleBoxBorderButton} setColor={setTitleBoxBorderButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={titleBoxBorderButton}
                      onChange={(e)=>titleBoxBorderColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>titleBoxBorderColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>  
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("6")} name={"Logo-Color"}/>
                </p>
                <div className={ colorBox6 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("6")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={logoColorButton} setColor={setLogoColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={logoColorButton}
                      onChange={(e)=>logoColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>logoColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("7")} name={"Logo-Box-Color"}/>
                </p>
                <div className={ colorBox7 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("7")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={logoBoxButton} setColor={setLogoBoxButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={logoBoxButton}
                      onChange={(e)=>logoBoxColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>logoBoxColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("8")} name={"Logo-Box-Border-Color"}/>
                </p>
                <div className={ colorBox8 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("8")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={logoBoxBorderButton} setColor={setLogoBoxBorderButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={logoBoxBorderButton}
                      onChange={(e)=>logoBoxBorderColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>logoBoxBorderColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("9")} name={"Menu-Bg-Color"}/>
                </p>
                <div className={ colorBox9 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("9")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={menuBgColorButton} setColor={setMenuBgColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBgColorButton}
                      onChange={(e)=>menuBgColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>menuBgColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("10")} name={"Menu-Border-Color"}/>
                </p>
                <div className={ colorBox10 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("10")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={menuBorderColorButton} setColor={setMenuBorderColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBorderColorButton}
                      onChange={(e)=>menuBorderColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>menuBorderColorApply()}
                      >
                      Apply
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("11")} name={"Menu-Text-Color"}/>
                </p>
                <div className={ colorBox11 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("11")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={menuTextColorButton} setColor={setMenuTextColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuTextColorButton}
                      onChange={(e)=>menuTextColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>menuTextColorApply()}
                      >
                      Apply
                      </button>
                    </p> 
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("12")} name={"Menu-Box-Color"}/>
                </p>
                <div className={ colorBox12 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("12")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={menuBoxColorButton} setColor={setMenuBoxColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBoxColorButton}
                      onChange={(e)=>menuBoxColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>menuBoxColorApply()}
                      >
                      Apply
                      </button>
                    </p> 
                  </div>
                </div>
              </div>

              <div className="relative w-[150px] ">
                <p className="flex justify-center my-1 w-[100%] ">
                  <ButtonSmall onClick={()=>colorBoxOpen("13")} name={"Menu-Box-Border-Color"}/>
                </p>
                <div className={ colorBox13 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                  
                  <div className="flex justify-end bg-[#006341]" >
                    <p 
                    onClick={()=>colorBoxClose("13")}
                    className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                  </div>
                  <div className="flex justify-center mt-1">
                    <ColorButton color={menuBoxBorderColorButton} setColor={setMenuBoxBorderColorButton}/>
                  </div>
                  <div className="flex justify-center">
                    <p className="m-1 flex justify-between w-full ">
                      <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBoxBorderColorButton}
                      onChange={(e)=>menuBoxBorderColorInputOnchage(e)}
                      />
                      <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                      onClick={()=>menuBoxBorderColorApply()}
                      >
                      Apply
                      </button>
                    </p> 
                  </div>
                </div>
              </div>
            </div>
            {/* color button end */}

            {/* layout change function start */}
            <div className=" mb-2 grid place-items-center grid-cols-2 z-0
            2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
            ">
              <div className=" border p-2 border-black rounded w-[170px] h-[360px] mt-1 "> 
                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Header-Height</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>headerHeightUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>headerHeightDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">Header-Border-Width</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>headerBorderUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>headerBorderDown()}
                  ><IoIosArrowDown/></button>
                </div>

    
                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">BG-Types</p>
                <div className="flex justify-center">
                  <fieldset className="radio-container" > 
                    <input 
                    onChange={(e)=>hearderTypeRadioOnchage(e)}
                    type="radio" name="hearderType" value={"a"} className="me-1"/>
                    <span className="me-2 text-sm">Image</span>
                    <input 
                    onChange={(e)=>hearderTypeRadioOnchage(e)}
                    type="radio" name="hearderType" value={"b"} className="me-1"/>
                    <span className="text-sm">None</span>
                  </fieldset>
                </div>

                {
                  (hearderType === "a")?
                  <div className="flex justify-center border-gray-200 pb-2 mb-2">
                    <div className="me-1">
                      <label className="cursor-pointer text-xs border hover:bg-gray-400 text-black font-bold py-1 px-4 rounded bg-gray-200" htmlFor="file_input">
                          Upload
                      </label>
                      <input className="w-[340px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                      hidden
                      " id="file_input" type="file"
                      accept="image/*" 
                      onChange={(e)=>hearderBgfileUploadHandler(e)}
                      
                      />
                      

                    </div>
                    <div className="" > 
                      <label className=" cursor-pointer text-xs  border hover:bg-gray-400 text-black font-bold py-1 px-4 rounded bg-gray-200"
                      htmlFor="img_delete"
                      onClick={()=>deleteHearderImg()}
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                  :""
                }
                


              </div>

              <div className=" border p-2 border-black rounded w-[170px] h-[360px] mt-1   "> 
                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Logo-Border-Width</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>logoBorderUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>logoBorderDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Logo-Text-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>logoSizeUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>logoSizeDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Logo-Radius-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>logoBoxBoxRadiusUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>logoBoxBoxRadiusDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Logo-Box-Size</p>
                <div className="flex justify-center pb-1">
                <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                  // onClick={()=>logoSizeUp()}
                  onClick={()=>logoBoxSizeHeightDown()}
                  ><IoIosArrowUp/></button>
                  <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>logoBoxSizeHeightUp()}
                  ><IoIosArrowDown/></button>
                  <p className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                  onClick={()=>logoBoxSizeDown()}
                  ><IoIosArrowBack/></p>
                  <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>logoBoxSizeUp()}
                  ><IoIosArrowForward/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Logo-Image-Size</p>
                <div className="flex justify-center pb-1">
                <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                  // onClick={()=>logoSizeUp()}
                  onClick={()=>imageHeightSizeDown()}
                  ><IoIosArrowUp/></button>
                  <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>imageHeightSizeUp()}
                  ><IoIosArrowDown/></button>
                  <p className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                  onClick={()=>imageWidthSizeDown()}
                  ><IoIosArrowBack/></p>
                  <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>imageWidthSizeUp()}
                  ><IoIosArrowForward/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Logo-Types</p>
                <div className="flex justify-center">
                  <fieldset className="radio-container" > 
                    <input 
                    onChange={(e)=>imageTypeRadioOnchage(e)}
                    type="radio" name="imageType" value={"a"} className="me-1"/>
                    <span className="me-2 text-sm">Image</span>
                    <input 
                    onChange={(e)=>imageTypeRadioOnchage(e)}
                    type="radio" name="imageType" value={"b"} className="me-1"/>
                    <span className="text-sm">Text</span>
                  </fieldset>
                </div>

                {
                  (logoType === "a")?
                  <div className="flex justify-center border-gray-200 pb-2 mb-2">
                    <div className="me-1">
                      <label className="cursor-pointer text-xs border hover:bg-gray-400 text-black font-bold py-1 px-4 rounded bg-gray-200" htmlFor="file_input">
                          Upload
                      </label>
                      <input className="w-[340px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                      hidden
                      " id="file_input" type="file"
                      accept="image/*" 
                      onChange={(e)=>logofileUploadHandler(e)}
                      
                      />
                      

                    </div>
                    <div className="" > 
                      <label className=" cursor-pointer text-xs  border hover:bg-gray-400 text-black font-bold py-1 px-4 rounded bg-gray-200"
                      htmlFor="img_delete"
                      onClick={()=>deleteImg()}
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                  :""
                }

              
              </div>

              <div className=" border p-2 border-black rounded w-[170px] h-[360px] mt-1   "> 
                
                <p className="flex  font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Title-Border-Width</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>titleBorderUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>titleBorderDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Title-Text-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>titleSizeUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>titleSizeDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Title-Radius-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>titleBoxBoxRadiusUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>titleBoxBoxRadiusDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Title-Box-Size</p>
                <div className="flex justify-center pb-1">
                <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                  onClick={()=>titleBoxHeightSizeDown()}
                  ><IoIosArrowUp/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>titleBoxHeightSizeUp()}
                  ><IoIosArrowDown/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                  onClick={()=>titleBoxSizeDown()}
                  ><IoIosArrowBack/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>titleBoxSizeUp()}
                  ><IoIosArrowForward/></p>
                </div>

              </div>

              {/* menu */}
              <div className=" border p-2 border-black rounded w-[170px] h-[360px] mt-1   "> 

                <p className="flex  font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Menu-Height</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuHeightUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuHeightDown()}
                  ><IoIosArrowDown/></button>
                </div>
                
                <p className="flex  font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Menu-Border-Width</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuBorderUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuBorderDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex  font-bold justify-center text-xs text-[#006341] border-b border-[#006341]  mb-1">MenuBox-Border-Width</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuBoxBorderUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuBoxBorderDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Title-Text-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuTextSizeUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuTextSizeDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Menu-Box-Radius-Size</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuBoxRadiusUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuBoxRadiusDown()}
                  ><IoIosArrowDown/></button>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Menu-Box-Size</p>
                <div className="flex justify-center pb-1">
                <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                  onClick={()=>menuBoxHeightSizeDown()}
                  ><IoIosArrowUp/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>menuBoxHeightSizeUp()}
                  ><IoIosArrowDown/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                  onClick={()=>menuBoxSizeDown()}
                  ><IoIosArrowBack/></p>
                  <p className=" text-[20px] hover:text-[25px] text-[#006341] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                  onClick={()=>menuBoxSizeUp()}
                  ><IoIosArrowForward/></p>
                </div>

                <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">Menu-Padding</p>
                <div className="flex justify-center pb-1">
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                  onClick={()=>menuPaddingUp()}
                  ><IoIosArrowUp/></button>
                  <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                  onClick={()=>menuPaddingDown()}
                  ><IoIosArrowDown/></button>
                </div>

              </div>
            </div>
            {/* layout change function end */}


          </div>
          
        }

        

        
        
        
        
       
        

            

        

      </>
      :<LoginMove/>
      }
      
    </>
  );
};

export default Main