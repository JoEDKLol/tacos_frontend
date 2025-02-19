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
import { ButtonBase } from "@/app/components/common/buttonComponents/Button";
import { usePathname, useRouter } from "next/navigation";
import { transactionAuth } from "@/app/utils/axiosAuth";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";

const Main = () => {

  const userStateSet = userState();
  const router = useRouter();
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
  
  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);
  useEffect(()=>{
    // console.log(userStateSet.id)
    // console.log(router);
  },[userStateSet])

  useEffect(()=>{
    // console.log(restaurantName);
  },[])

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
    if(menuSizeNum < 0) return;
    menuSizeNum--;
    setRestaurantTitleSize(menuSizeNum + "")
  }

  function headerHeightUp(){
    let headerHeightSizeNum = Number(headerHight);
    headerHeightSizeNum = headerHeightSizeNum + 5;
    setHeaderHight(headerHeightSizeNum + "")
  }

  function headerHeightDown(){
    let headerHeightSizeNum = Number(headerHight);
    if(headerHeightSizeNum < 0) return;
    headerHeightSizeNum = headerHeightSizeNum - 5;
    setHeaderHight(headerHeightSizeNum + "")
  }

  function titleBoxSizeDown(){
    let titleBoxSizeNum = Number(titleBoxSize);
    if(titleBoxSizeNum < 0) return;
    titleBoxSizeNum = titleBoxSizeNum - 5;
    setTitleBoxSize(titleBoxSizeNum + "")
  }

  function titleBoxSizeUp(){
    let titleBoxSizeNum = Number(titleBoxSize);
    titleBoxSizeNum = titleBoxSizeNum + 5;
    setTitleBoxSize(titleBoxSizeNum + "")
  }

  function titleBoxHeightSizeDown(){
    let titleBoxSizeHeightNum = Number(titleBoxSizeHeight);
    if(titleBoxSizeHeightNum < 0) return;
    titleBoxSizeHeightNum = titleBoxSizeHeightNum - 5;

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
    if(headerBorderWidthNum < 0) return;
    headerBorderWidthNum = headerBorderWidthNum - 1;
    setHeaderBorderWidth(headerBorderWidthNum + "")
  }

  function titleBorderUp(){
    let titleBorderWidthNum = Number(titleBoxBorderSize);
    titleBorderWidthNum = titleBorderWidthNum + 1;
    setTitleBoxBorderSize(titleBorderWidthNum + "")
  }

  function titleBorderDown(){
    let titleBorderWidthNum = Number(titleBoxBorderSize);
    if(titleBorderWidthNum < 0) return;
    titleBorderWidthNum = titleBorderWidthNum - 1;
    setTitleBoxBorderSize(titleBorderWidthNum + "")
  }

  function imageWidthSizeUp(){
    let imageWidthSizeNum = Number(imageWidthSize);
    imageWidthSizeNum = imageWidthSizeNum + 3;
    setImageWidthSize(imageWidthSizeNum + "")
  }

  function imageWidthSizeDown(){
    let imageWidthSizeNum = Number(imageWidthSize);
    if(imageWidthSizeNum < 0) return;
    imageWidthSizeNum = imageWidthSizeNum - 3;
    setImageWidthSize(imageWidthSizeNum + "")
  }

  function imageHeightSizeUp(){
    let titleBorderWidthNum = Number(imageHeightSize);
    titleBorderWidthNum = titleBorderWidthNum + 3;
    setImageHightSize(titleBorderWidthNum + "")
  }

  function imageHeightSizeDown(){
    let titleBorderWidthNum = Number(imageHeightSize);
    if(titleBorderWidthNum < 0) return;
    titleBorderWidthNum = titleBorderWidthNum - 3;
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
    if(logoSizeNum < 0) return;
    logoSizeNum = logoSizeNum - 3;
    setLogoSize(logoSizeNum + "")
  }

  function logoBoxSizeDown(){
    let logoBoxSizeNum = Number(logoBoxSize);
    if(logoBoxSizeNum < 0) return;
    logoBoxSizeNum = logoBoxSizeNum - 3;
    setlogoBoxSize(logoBoxSizeNum + "")
  }

  function logoBoxSizeUp(){
    let logoBoxSizeNum = Number(logoBoxSize);
    logoBoxSizeNum = logoBoxSizeNum + 3;
    setlogoBoxSize(logoBoxSizeNum + "")
  }

  function logoBoxSizeHeightDown(){
    let logoBoxSizeHeighNum = Number(logoBoxSizeHeigh);
    if(logoBoxSizeHeighNum < 0) return;
    logoBoxSizeHeighNum = logoBoxSizeHeighNum - 3;
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
    if(logoBoxBorderSizeNum < 0) return;
    logoBoxBorderSizeNum = logoBoxBorderSizeNum - 1;
    setLogoBoxBorderSize(logoBoxBorderSizeNum + "")
  }

  function menuBoxSizeDown(){
    let menuTextBoxSizeNum = Number(menuTextBoxSize);
    if(menuTextBoxSizeNum < 0) return;
    menuTextBoxSizeNum = menuTextBoxSizeNum - 5;
    setMenuTextBoxSize(menuTextBoxSizeNum + "")
  }

  function menuBoxSizeUp(){
    let menuTextBoxSizeNum = Number(menuTextBoxSize);
    menuTextBoxSizeNum = menuTextBoxSizeNum + 5;
    setMenuTextBoxSize(menuTextBoxSizeNum + "")
  }

  function menuBoxHeightSizeDown(){
    let menuTextBoxSizeHeightNum = Number(menuTextBoxSizeHeight);
    if(menuTextBoxSizeHeightNum < 0) return;
    menuTextBoxSizeHeightNum = menuTextBoxSizeHeightNum - 5;

    setMenuTextBoxSizeHeight(menuTextBoxSizeHeightNum + "")
  }

  function menuBoxHeightSizeUp(){
    let menuTextBoxSizeHeightNum = Number(menuTextBoxSizeHeight);
    menuTextBoxSizeHeightNum = menuTextBoxSizeHeightNum + 5;
    setMenuTextBoxSizeHeight(menuTextBoxSizeHeightNum + "")
  }

  function deleteImg(){
    setImg("");
    // setImgDelete(true);
  }

  function deleteHearderImg(){
    setHearderImg("");
    // setImgDelete(true);
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
    if(logoBoxRadiusNum < 0) return;
    logoBoxRadiusNum = logoBoxRadiusNum - 1;
    setlogoBoxRadius(logoBoxRadiusNum + "")
  }

  function titleBoxBoxRadiusUp(){
    let logoBoxRadiusNum = Number(titleBoxRadius);
    logoBoxRadiusNum = logoBoxRadiusNum + 1;
    setTitleBoxRadius(logoBoxRadiusNum + "")
  }

  function titleBoxBoxRadiusDown(){
    let setlogoBoxRadiusNum = Number(titleBoxRadius);
    if(setlogoBoxRadiusNum < 0) return;
    setlogoBoxRadiusNum = setlogoBoxRadiusNum - 1;
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
    if(menuBorderWidthNum < 0) return;
    menuBorderWidthNum = menuBorderWidthNum - 1;
    setMenuBorderWidth(menuBorderWidthNum + "")
  }

  function menuTextSizeUp(){
    let menuTextSizeNum = Number(menuTextSize);
    menuTextSizeNum++;
    setMenuTextSize(menuTextSizeNum + "")
  }

  function menuTextSizeDown(){
    let menuTextSizeNum = Number(menuTextSize);
    if(menuTextSizeNum < 0) return;
    menuTextSizeNum--;
    setMenuTextSize(menuTextSizeNum + "")
  }

  function menuBoxRadiusUp(){
    let menuTextBoxRadiusSizeNum = Number(menuTextBoxRadiusSize);
    menuTextBoxRadiusSizeNum = menuTextBoxRadiusSizeNum + 1;
    setMenuTextBoxRadiusSize(menuTextBoxRadiusSizeNum + "")
  }

  function menuBoxRadiusDown(){
    let menuTextBoxRadiusSizeNum = Number(menuTextBoxRadiusSize);
    if(menuTextBoxRadiusSizeNum < 0) return;
    menuTextBoxRadiusSizeNum = menuTextBoxRadiusSizeNum - 1;
    setMenuTextBoxRadiusSize(menuTextBoxRadiusSizeNum + "")
  }

  function menuBoxBorderUp(){
    let menuTextBorderWidthNum = Number(menuTextBorderWidth);
    menuTextBorderWidthNum = menuTextBorderWidthNum + 1;
    setMenuTextBorderWidth(menuTextBorderWidthNum + "")
  }

  function menuBoxBorderDown(){
    let menuTextBorderWidthNum = Number(menuTextBorderWidth);
    if(menuTextBorderWidthNum < 0) return;
    menuTextBorderWidthNum = menuTextBorderWidthNum - 1;
    setMenuTextBorderWidth(menuTextBorderWidthNum + "")
  }

  function menuHeightUp(){
    let menuHeightNum = Number(menuHeight);
    menuHeightNum = menuHeightNum + 5;
    setMenuHeight(menuHeightNum + "")
  }

  function menuHeightDown(){
    let menuHeightNum = Number(menuHeight);
    if(menuHeightNum < 0) return;
    menuHeightNum = menuHeightNum - 5;
    setMenuHeight(menuHeightNum + "")
  }

  function menuPaddingUp(){
    let menuItemPaddingNum = Number(menuItemPadding);
    menuItemPaddingNum = menuItemPaddingNum + 5;
    setMenuItemPadding(menuItemPaddingNum + "")
  }

  function menuPaddingDown(){
    let menuItemPaddingNum = Number(menuItemPadding);
    if(menuItemPaddingNum < 0) return;
    menuItemPaddingNum = menuItemPaddingNum - 5;
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
        logoType : logoType, 
        img : img, 
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

  return(
    <>  
      {
        (userStateSet.id)?
        <>
        <div className="mb-1">
          <div className="flex justify-center items-center h-10 border-b  bg-[#006341]">
            <p className="text-white text-xl">Header Update</p>
          </div>
        </div>

        <div className="">
          <div className={" relative top-0 left-0  w-[100%] z-10 " } style={{backgroundColor:bgColor, height:headerHight + "px", borderColor:borderColor , borderWidth:headerBorderWidth + "px"}}>
            
            <div className=" absolute w-full h-full -z-30">
              {
                (hearderType === "a")?
                <p className="">
                  {
                    (hearderImg)?
                    <Image
                    src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
                    alt=""
                    quality={30} 
                    layout="fill"
                    loading="lazy"
                    style={{ objectFit: "cover"}}
                  />
                    :""
                  }
                </p>
                :""
              }  
              {/* <p className="">
                <Image
                  src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
                  alt=""
                  quality={30} 
                  layout="fill"
                  loading="lazy"
                  style={{ objectFit: "cover"}}
                />
              </p> */}
            
            </div>  
            
            <div className="absolute flex items-center h-[100%] w-full -z-20  ">
              
              {/* <p className={" relative "  }>
                <Image
                  src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
                  alt=""
                  quality={30} 
                  layout="fill"
                  loading="lazy"
                  style={{ objectFit: "cover"}}
                />
              </p> */}

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
        {/* menu */}
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

        <div className="flex justify-end p-1 border-b border-black">
          <ButtonBase onClick={()=>save()} name={"SAVE"}/> 
        </div>

        <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
        2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
        ">
          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("1")} name={"Header-Color"}/>
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
                <p className="m-1 flex justify-between w-[200px]">
                  <input className="text-sm p-1 ps-2 w-[120px] border border-[#006341] outline-none rounded" value={bgColorButton} 
                  onChange={(e)=>bgInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>bgColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div> 
            </div>
          </div>  

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
            <ButtonBase onClick={()=>colorBoxOpen("2")} name={"Border-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={borderColorButton}
                  onChange={(e)=>borderInputOnchange(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>borderColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div> 
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("3")} name={"Title-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={titleColorButton}
                  onChange={(e)=>titleColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>titleColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("4")} name={"Title-Box-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={titleBoxButton}
                  onChange={(e)=>titleBoxColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>titleBoxColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>  
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("5")} name={"Title-Box-Border-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={titleBoxBorderButton}
                  onChange={(e)=>titleBoxBorderColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>titleBoxBorderColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>  
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("6")} name={"Logo-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={logoColorButton}
                  onChange={(e)=>logoColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>logoColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("7")} name={"Logo-Box-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={logoBoxButton}
                  onChange={(e)=>logoBoxColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>logoBoxColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("8")} name={"Logo-Box-Border-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={logoBoxBorderButton}
                  onChange={(e)=>logoBoxBorderColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>logoBoxBorderColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("9")} name={"Menu-Bg-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuBgColorButton}
                  onChange={(e)=>menuBgColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>menuBgColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("10")} name={"Menu-Border-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuBorderColorButton}
                  onChange={(e)=>menuBorderColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>menuBorderColorApply()}
                  >
                  Apply
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("11")} name={"Menu-Text-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuTextColorButton}
                  onChange={(e)=>menuTextColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>menuTextColorApply()}
                  >
                  Apply
                  </button>
                </p> 
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("12")} name={"Menu-Box-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuBoxColorButton}
                  onChange={(e)=>menuBoxColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>menuBoxColorApply()}
                  >
                  Apply
                  </button>
                </p> 
              </div>
            </div>
          </div>

          <div className="relative w-[230px] ">
            <p className="flex justify-center my-1 w-[100%] ">
              <ButtonBase onClick={()=>colorBoxOpen("13")} name={"Menu-Box-Border-Color"}/>
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
                <p className="my-1 flex justify-between w-[200px] ">
                  <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuBoxBorderColorButton}
                  onChange={(e)=>menuBoxBorderColorInputOnchage(e)}
                  />
                  <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                  onClick={()=>menuBoxBorderColorApply()}
                  >
                  Apply
                  </button>
                </p> 
              </div>
            </div>
          </div>

          
        </div>

        <div className=" mb-2 grid place-items-center grid-cols-2 z-0
        2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
        ">
          <div className=" border p-2 border-black rounded w-[200px] h-[360px] mt-1 "> 
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
                      Upload Img
                  </label>
                  <input className="w-[340px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                  hidden
                  " id="file_input" type="file"
                  accept="image/*" 
                  // onChange={(e)=>fileUploadHandler(e)}
                  
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

          <div className=" border p-2 border-black rounded w-[200px] h-[360px] mt-1   "> 
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
                      Upload Img
                  </label>
                  <input className="w-[340px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                  hidden
                  " id="file_input" type="file"
                  accept="image/*" 
                  // onChange={(e)=>fileUploadHandler(e)}
                  
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

          <div className=" border p-2 border-black rounded w-[200px] h-[360px] mt-1   "> 
            
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
          <div className=" border p-2 border-black rounded w-[200px] h-[360px] mt-1   "> 

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

            <p className="flex  font-bold justify-center text-sm text-[#006341] border-b border-[#006341]  mb-1">MenuBox-Border-Width</p>
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

            

        

      </>
      :<LoginMove/>
      }
      
    </>
  );
};

export default Main