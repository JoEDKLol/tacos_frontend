'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import LoginMove from "@/app/components/common/LoginMove";
import userState from "@/app/store/user";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { ButtonBase } from "@/app/components/common/buttonComponents/Button";


const Main = () => {

  const userStateSet = userState();

  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); 
  const [borderColorButton, setBorderColorButton] = useState<string>("#000000"); 

  const [bgColor, setBgColor] = useState<string>(""); 
  const [borderColor, setBorderColor] = useState<string>("#000000"); 
  const [headerBorderWidth, setHeaderBorderWidth] = useState<string>("1"); 
  

  const [titleColorButton, setTitleColorButton] = useState<string>("#ffffff");
  const [restaurantTitleColor, setRestaurantTitleColor] = useState<string>(""); 
  const [restaurantTitleSize, setRestaurantTitleSize] = useState<string>("20"); 
  const [titleBoxSize, setTitleBoxSize] = useState<string>("100");
  const [titleBoxSizeHeight, setTitleBoxSizeHeight] = useState<string>("50"); 
  const [titleBoxBorderSize, setTitleBoxBorderSize] = useState<string>("1"); 

  const [titleBoxButton, setTitleBoxButton] = useState<string>("#ffffff"); 
  const [titleBoxBorderButton, setTitleBoxBorderButton] = useState<string>("#ffffff"); 
  const [titleBoxBgColor, setTitleBoxBgColor] = useState<string>("#ffffff"); 
  const [titleBoxBorderColor, setTitleBoxBorderColor] = useState<string>("#000000"); 

  const [headerHight, setHeaderHight] = useState<string>("70"); 
  const [logoType, setLogoType] = useState<string>("b"); //logo 타입

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

  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [colorBox2, setColorBox2] = useState<string>("hidden");
  const [colorBox3, setColorBox3] = useState<string>("hidden");
  const [colorBox4, setColorBox4] = useState<string>("hidden");
  const [colorBox5, setColorBox5] = useState<string>("hidden");
  const [colorBox6, setColorBox6] = useState<string>("hidden");
  const [colorBox7, setColorBox7] = useState<string>("hidden");
  const [colorBox8, setColorBox8] = useState<string>("hidden");

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

  function deleteImg(){
    setImg("");
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

  function save(){
    const obj = {
      header : {
        bgColor : bgColor , 
        headerHight : headerHight , 
        borderColor : borderColor , 
        headerBorderWidth : headerBorderWidth , 
        logoType : logoType , 
        imageWidthSize : imageWidthSize , 
        imageHeightSize : imageHeightSize , 
        logoBoxBorderColor : logoBoxBorderColor , 
        logoBoxRadius : logoBoxRadius , 
        logoBoxBorderSize : logoBoxBorderSize , 
        logoSize : logoSize , 
        logoColor : logoColor , 
        logoBoxBgColor : logoBoxBgColor , 
        logoBoxSize : logoBoxSize , 
        logoBoxSizeHeigh : logoBoxSizeHeigh , 
        img : img , 
        restaurantTitleSize : restaurantTitleSize , 
        restaurantTitleColor : restaurantTitleColor , 
        titleBoxBgColor : titleBoxBgColor , 
        titleBoxSize : titleBoxSize , 
        titleBoxSizeHeight : titleBoxSizeHeight , 
        titleBoxBorderColor : titleBoxBorderColor , 
        titleBoxBorderSize : titleBoxBorderSize , 
        titleBoxRadius : titleBoxRadius , 
      }
    }
    console.log(obj);
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

        <div>
          <div className={" top-0 left-0  w-[100%] z-10 " } style={{backgroundColor:bgColor, height:headerHight + "px", borderColor:borderColor , borderWidth:headerBorderWidth + "px"}}>
             
            <div className="flex justify-between items-center h-[100%] -z-50 ">
              <div className="m-5 flex justify-center items-center ">
                {
                  (logoType === "a")?
                  <>
                  <div className=" flex items-center relative "
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
                      :<p>IMG</p>
                    }
                  </div>
                  </>
                  :
                  <p className=" flex items-center "
                  style={
                    {
                      fontSize:logoSize + "px", 
                      fontWeight:"bold", 
                      color:logoColor, 
                    }
                  }
                  > 
                    <input type="text" className="rounded text-center w-full border outline-none"
                    style={{
                      backgroundColor:logoBoxBgColor, 
                      width:logoBoxSize + "px" , 
                      height:logoBoxSizeHeigh + "px",
                      borderColor:logoBoxBorderColor, 
                      borderWidth:logoBoxBorderSize + "px",
                      borderRadius:logoBoxRadius + "px"
                    }}
                    />
                  </p> 
                }

                {
                  (logoType === "a")?
                  <div className="ms-2 ">
                    <div className=" flex items-center ">
                      <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                      onClick={()=>imageWidthSizeUp()}
                      ><IoIosArrowUp/></p>
                      <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>imageWidthSizeDown()}
                      ><IoIosArrowDown/></p>
                    </div>
                    <div className="mt-1 flex items-center ">
                      <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>imageHeightSizeDown()}
                      ><IoIosArrowBack/></p>
                      <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>imageHeightSizeUp()}
                      ><IoIosArrowForward/></p>
                    </div>
                  </div>
                  :
                  <div className="ms-2">
                    <div className=" flex items-center ">
                      <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                      // onClick={()=>logoSizeUp()}
                      onClick={()=>logoBoxSizeHeightUp()}
                      ><IoIosArrowUp/></p>
                      <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>logoBoxSizeHeightDown()}
                      ><IoIosArrowDown/></p>
                    </div>
                    <div className="mt-1 flex items-center ">
                      <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>logoBoxSizeDown()}
                      ><IoIosArrowBack/></p>
                      <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>logoBoxSizeUp()}
                      ><IoIosArrowForward/></p>
                    </div> 
                  </div>
                }

                

              </div>
              <div className="m-1 flex justify-center me-20 " style={
                  {
                    fontSize:restaurantTitleSize + "px", 
                    fontWeight:"bold", 
                    color:restaurantTitleColor, 
                  }
                }>
                <input className=" p-1 rounded text-center outline-none"
                style={{
                  backgroundColor:titleBoxBgColor, 
                  width:titleBoxSize + "px" , 
                  height:titleBoxSizeHeight + "px" ,
                  borderColor:titleBoxBorderColor, 
                  borderWidth:titleBoxBorderSize + "px",
                  borderRadius:titleBoxRadius + "px"
                }}
                ></input>

                <div className="ms-2">
                  <div className=" flex items-center ">
                    <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded "  style={{ fontWeight:"bold"}} 
                    onClick={()=>titleBoxHeightSizeUp()}
                    ><IoIosArrowUp/></p>
                    <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                    onClick={()=>titleBoxHeightSizeDown()}
                    ><IoIosArrowDown/></p>
                  </div>
                  <div className="mt-1 flex items-center ">
                    <p className=" text-[20px] hover:text-[25px] bg-white mr-1 cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                    onClick={()=>titleBoxSizeDown()}
                    ><IoIosArrowBack/></p>
                    <p className=" text-[20px] hover:text-[25px] bg-white cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                    onClick={()=>titleBoxSizeUp()}
                    ><IoIosArrowForward/></p>
                  </div>
                </div>

              </div> 
              
              <div className="ms-5  ">
                
              </div>
              
            </div>
            
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

          
        </div>

        <div className=" mb-2 grid place-items-center grid-cols-2 z-0
        2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
        ">
          <div className=" border p-2 border-black rounded w-[200px] h-[260px] mt-1 "> 
            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341] mb-1">Header-Height</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>headerHeightUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>headerHeightDown()}
              ><IoIosArrowDown/></button>
            </div>

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341] mb-1 px-1">Header-Border-Width</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>headerBorderUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>headerBorderDown()}
              ><IoIosArrowDown/></button>
            </div>

            

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341] mb-1">Image Types</p>
            <div className="flex justify-center">
              <fieldset className="radio-container" >
                <input 
                onChange={(e)=>imageTypeRadioOnchage(e)}
                type="radio" name="imageType" value={"a"} className="me-1"/><span className="me-2">Image</span>
                <input 
                onChange={(e)=>imageTypeRadioOnchage(e)}
                type="radio" name="imageType" value={"b"} className="me-1"/><span className="">Text</span>
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

          <div className=" border p-2 border-black rounded w-[200px] h-[260px] mt-1   "> 
            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Logo-Border-Width</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>logoBorderUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>logoBorderDown()}
              ><IoIosArrowDown/></button>
            </div>

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Logo-Text-Size</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>logoSizeUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>logoSizeDown()}
              ><IoIosArrowDown/></button>
            </div>

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Logo-Radius-Size</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>logoBoxBoxRadiusUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>logoBoxBoxRadiusDown()}
              ><IoIosArrowDown/></button>
            </div>

          
          </div>

          <div className=" border p-2 border-black rounded w-[200px] h-[260px] mt-1   "> 
            
            <p className="flex  font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Title-Border-Width</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>titleBorderUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>titleBorderDown()}
              ><IoIosArrowDown/></button>
            </div>

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Title-Text-Size</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>titleSizeUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>titleSizeDown()}
              ><IoIosArrowDown/></button>
            </div>

            <p className="flex font-bold justify-center text-[#006341] border-b border-[#006341]  mb-1">Title-Radius-Size</p>
            <div className="flex justify-center pb-1">
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
              onClick={()=>titleBoxBoxRadiusUp()}
              ><IoIosArrowUp/></button>
              <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
              onClick={()=>titleBoxBoxRadiusDown()}
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