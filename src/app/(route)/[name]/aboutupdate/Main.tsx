'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { ButtonBase, ButtonRefresh, ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import ManageMove from "@/app/components/common/ManageMove";
import GoogleMap5 from "@/app/components/googleMap/GoogleMap5";
import QuillEditorScreen from "@/app/components/quillEditor/QuillEditorScreen";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";


const Main = () => {

  const userStateSet = userState();
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);

  const [quillColorButton, setQuillColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값

  const [bgColorQuill, setBgColorQuill] = useState<string>(""); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 

  const [content, setContent] = useState("");
  const [readOnly] = useState(false);
  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [colorBox2, setColorBox2] = useState<string>("hidden");
  const [colorBox3, setColorBox3] = useState<string>("hidden");
  const [colorBox4, setColorBox4] = useState<string>("hidden");
  const [colorBox5, setColorBox5] = useState<string>("hidden");

  const [homeLayoutYn, setHomeLayoutYn] = useState<boolean>(false);

  const [quillWidth, setQuillWidth] = useState<string>("70");
  const [quillTop, setQuillTop] = useState<string>("10");

  const focusAddressRef = useRef<HTMLTextAreaElement>(null);
  const [address, setAddress] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");

  const [locationColorButton, setLocationColorButton] = useState<string>("#000000"); //초기값
  const [locationColor, setLocationColor] = useState<string>(""); //초기값
  const [addressColorButton, setAddressColorButton] = useState<string>("#000000"); //초기값
  const [addressColor, setAddressColor] = useState<string>(""); //초기값
  const [phoneNumberColorButton, setPhoneNumberColorButton] = useState<string>("#000000"); //초기값
  const [phoneNumberColor, setPhoneNumberColor] = useState<string>(""); //초기값

  const [locationTextSize, setLocationTextSize] = useState<string>("15");
  const [addressTextSize, setAddressTextSize] = useState<string>("15");
  const [phoneNumberTextSize, setPhoneNumberTextSize] = useState<string>("15");

  const [latLng, setLatLng] = useState<object>({});
  
  useEffect(()=>{
    if(userStateSet.userseq > 0){
      homeLayoutSearch();
    }
  },[userStateSet]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < phoneNum.length; i++) {
      const currentByte = phoneNum.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 20){
        setPhoneNum(phoneNum.substring(0, i));
        break;
      }
    }
  },[phoneNum]);

  function quillBgInputOnchage(e:any){
    setQuillColorButton(e.target.value)
  }

  function quillBgColorApply(){
    setBgColorQuill(quillColorButton);
  }

  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  function locationInputOnchage(e:any){
    setLocationColorButton(e.target.value)
  }

  function locationColorApply(){
    setLocationColor(locationColorButton);
  }

  function addressInputOnchage(e:any){
    setAddressColorButton(e.target.value)
  }

  function addressColorApply(){
    setAddressColor(addressColorButton);
  }

  function phoneInputOnchage(e:any){
    setPhoneNumberColorButton(e.target.value)
  }

  function phoneColorApply(){
    setPhoneNumberColor(phoneNumberColorButton);
  }

  

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      about : {
        bgColorQuill:bgColorQuill, 
        bgColor:bgColor, 
        content:content, 
        quillWidth:quillWidth, 
        quillTop:quillTop, 
        locationColor:locationColor, 
        addressColor:addressColor, 
        phoneNumberColor:phoneNumberColor, 
        locationTextSize:locationTextSize, 
        addressTextSize:addressTextSize, 
        phoneNumberTextSize:phoneNumberTextSize, 
        phoneNum:phoneNum,
      }
    }

    const retObj = await transactionAuth("post", "management/aboutsave", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
  }

  function colorBoxClose(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("hidden");
    if(colorBoxNum === "2") setColorBox2("hidden");
    if(colorBoxNum === "3") setColorBox3("hidden");
    if(colorBoxNum === "4") setColorBox4("hidden");
    if(colorBoxNum === "5") setColorBox5("hidden");

  }

  function colorBoxOpen(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("block");
    if(colorBoxNum === "2") setColorBox2("block");
    if(colorBoxNum === "3") setColorBox3("block");
    if(colorBoxNum === "4") setColorBox4("block");
    if(colorBoxNum === "5") setColorBox5("block");
  }

  async function homeLayoutSearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/aboutlayoutsearch", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === "y"){
      console.log("????????"+retObj.sendObj.resObj.latLng);
      setLatLng(retObj.sendObj.resObj.latLng);
      setAddress(retObj.sendObj.resObj.address);
      if(retObj.sendObj.resObj.about){
        setLayOut(retObj.sendObj.resObj.about);
      }else{
        setLayOut(
          {
            bgColor:"#ffffff",
            bgColorQuill:"#ffffff", 
            content:"", 
            quillWidth:"70",
            quillTop:"10", 
            locationColor:"#000000", 
            addressColor:"#000000", 
            phoneNumberColor:"#000000", 
            locationTextSize:"15", 
            addressTextSize:"15", 
            phoneNumberTextSize:"15", 
          }
        );
        
        
      }

      setHomeLayoutYn(true);
    }else{
      setHomeLayoutYn(false);
    }

  }

  function setLayOut(layOutObj:any){
    setQuillColorButton(layOutObj.bgColorQuill);
    setBgColorButton(layOutObj.bgColor);
    setBgColorQuill(layOutObj.bgColorQuill);
    setBgColor(layOutObj.bgColor);
    setContent(layOutObj.content);
    setQuillWidth(layOutObj.quillWidth);
    setQuillTop(layOutObj.quillTop);
    setLocationColorButton(layOutObj.locationColor);
    setLocationColor(layOutObj.locationColor);
    setAddressColorButton(layOutObj.addressColor);
    setAddressColor(layOutObj.addressColor);
    setPhoneNumberColorButton(layOutObj.phoneNumberColor);
    setPhoneNumberColor(layOutObj.phoneNumberColor);
    setLocationTextSize(layOutObj.locationTextSize);
    setAddressTextSize(layOutObj.addressTextSize);
    setPhoneNumberTextSize(layOutObj.phoneNumberTextSize);
    setPhoneNum(layOutObj.phoneNum);

    // setLocationColorButton("#000000");
    // setLocationColor("#000000");
    // setAddressColorButton("#000000");
    // setAddressColor("#000000");
    // setPhoneNumberColorButton("#000000");
    // setPhoneNumberColor("#000000");
    // setLocationTextSize("15");
    // setAddressTextSize("15");
    // setPhoneNumberTextSize("15");
  }

  function quillTopUp(){
    let quillTopNum = Number(quillTop);
    quillTopNum = quillTopNum + 5;
    setQuillTop(quillTopNum + "")
  }

  function quillTopDown(){
    let quillTopNum = Number(quillTop);
    quillTopNum = quillTopNum - 5;
    if(quillTopNum < 0) return;
    setQuillTop(quillTopNum + "")
  }

  function quillWidthDown(){
    let quillWidthNum = Number(quillWidth);
    quillWidthNum = quillWidthNum - 5;
    if(quillWidthNum < 0) return;
    setQuillWidth(quillWidthNum + "")
  }

  function quillWidthUp(){
    let quillWidthNum = Number(quillWidth);
    quillWidthNum = quillWidthNum + 5;
    setQuillWidth(quillWidthNum + "")
  }

  function addressTextareaOnChange(e:any){
    setAddress(e.target.value);
    // // focusAddressRef.current?.style.height
    // if (focusAddressRef && focusAddressRef.current) {
    //   // focusAddressRef.current?.style.height = focusAddressRef.current.scrollHeight + "px";
    //   // console.log(focusAddressRef.current?.style.height);
    // }
  }

  function phoneNumOnChange(e:any){
    setPhoneNum(e.target.value);
  }

  function locationSizeUp(){
    console.log(locationTextSize);
    let locationTextSizeNum = Number(locationTextSize);
    locationTextSizeNum++;
    setLocationTextSize(locationTextSizeNum + "")
  }

  function locationSizeDown(){
    let locationTextSizeNum = Number(locationTextSize);
    locationTextSizeNum--;
    if(locationTextSizeNum < 0) return;
    setLocationTextSize(locationTextSizeNum + "")
  }

  function addressSizeUp(){
    let addressTextSizeNum = Number(addressTextSize);
    addressTextSizeNum++;
    setAddressTextSize(addressTextSizeNum + "")
  }

  function addressSizeDown(){
    let addressTextSizeNum = Number(addressTextSize);
    addressTextSizeNum--;
    if(addressTextSizeNum < 0) return;
    setAddressTextSize(addressTextSizeNum + "")
  }

  function phoneNumberSizeUp(){
    let phoneNumberTextSizeNum = Number(phoneNumberTextSize);
    phoneNumberTextSizeNum++;
    setPhoneNumberTextSize(phoneNumberTextSizeNum + "")
  }

  function phoneNumberSizeDown(){
    let phoneNumberTextSizeNum = Number(phoneNumberTextSize);
    phoneNumberTextSizeNum--;
    if(phoneNumberTextSizeNum < 0) return;
    setPhoneNumberTextSize(phoneNumberTextSizeNum + "")
  }


  return(
    <>  
      {
        (userStateSet.id)?
        <>
          <div className="w-full" >
            <div className="flex justify-center items-center h-10 bg-[#006341]">
              <p className="text-white text-xl">About Update</p>
            </div>
          </div>


          {
            (!homeLayoutYn)?
            <div>
              <ManageMove/>
            </div>:
            <div>
              <div className="flex justify-end p-1 border border-white bg-[#739e8f] ">
                <p className="flex justify-center items-center mr-1">
                  <ButtonRefresh 
                  onClick={()=>homeLayoutSearch()}
                  />
                </p>
                <p><ButtonBase onClick={()=>save()} name={"SAVE"}/> </p>
              </div>

              <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("1")} name={"Quill-Color"}/>
                  </p> 
                  <div className={ colorBox1 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("1")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={quillColorButton} setColor={setQuillColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={quillColorButton} 
                        onChange={(e)=>quillBgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>quillBgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>  
                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("2")} name={"BG-Color"}/>
                  </p> 
                  <div className={ colorBox2 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("2")}
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

                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("3")} name={"Location-Color"}/>
                  </p> 
                  <div className={ colorBox3 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("3")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={locationColorButton} setColor={setLocationColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={locationColorButton} 
                        onChange={(e)=>locationInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>locationColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("4")} name={"Address-Color"}/>
                  </p> 
                  <div className={ colorBox4 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("4")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={addressColorButton} setColor={setAddressColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={addressColorButton} 
                        onChange={(e)=>addressInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>addressColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("5")} name={"PhoneNum-Color"}/>
                  </p> 
                  <div className={ colorBox5 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("5")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={phoneNumberColorButton} setColor={setPhoneNumberColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={phoneNumberColorButton} 
                        onChange={(e)=>phoneInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>phoneColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Quill-Top</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>quillTopUp()}
                    ><IoIosArrowUp/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>quillTopDown()}
                    ><IoIosArrowDown/></button>
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">Quill-Width</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>quillWidthDown()}
                    ><IoIosArrowBack/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>quillWidthUp()}
                    ><IoIosArrowForward/></button>
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">Location-Text-Width</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>locationSizeUp()}
                    ><IoIosArrowUp/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>locationSizeDown()}
                    ><IoIosArrowDown/></button>
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">Address-Text-Width</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>addressSizeUp()}
                    ><IoIosArrowUp/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>addressSizeDown()}
                    ><IoIosArrowDown/></button>
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">PhoneNumber-Text-Width</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>phoneNumberSizeUp()}
                    ><IoIosArrowUp/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>phoneNumberSizeDown()}
                    ><IoIosArrowDown/></button>
                  </div>
                </div>


              </div>

              <div className={" h-[110vh] border p-1 flex justify-center " } style={{backgroundColor:bgColor, paddingTop:quillTop + "px"}}>
                
                <div className="">
                  <QuillEditorScreen bgColor={bgColorQuill} content={content} setContent={setContent} readOnly={readOnly} styleType={"style"} quillWidth={quillWidth} />
                  <div className="mt-10 grid grid-cols-1 
                  2xl:flex xl:flex lg:flex md:flex sm:grid
                  2xl:justify-center xl:justify-center lg:justify-center md:justify-center sm:grid-cols-1
                  ">
                    <div className="w-full flex justify-center me-2
                    2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full
                    ">
                      <div className="w-full  ">
                        <p className="" 
                        style={{fontSize:locationTextSize + "px" , fontWeight:"bold", color:locationColor}}
                        >
                        Location      
                        {/* <span className="inline-block ">asdf</span> */}
                        </p>
                        <p className="">
                          <textarea
                          ref={focusAddressRef}
                          onChange={(e)=>addressTextareaOnChange(e)}
                          className=" w-full resize-none break-all outline-none py-2 " 
                          spellCheck={false} 
                          value={address}
                          rows={3}
                          style={{fontSize:addressTextSize + "px", fontWeight:"bold", color:addressColor , backgroundColor:bgColor}}
                          ></textarea>
                        </p>
                        
                        <p className="my-3" 
                        style={{fontSize:phoneNumberTextSize + "px", fontWeight:"bold", color:phoneNumberColor}}
                        >
                          <input type="text" className="w-full border border-[#006341] outline-none px-2 py-1 rounded-lg " 
                          onChange={(e)=>phoneNumOnChange(e)}
                          placeholder="Phone Number"
                          value={phoneNum}
                          style={{backgroundColor:bgColor}}
                          />
                        </p>
                        
                      </div>
                    </div>
                    {/* 지도 */}
                    <div className=" w-full flex justify-center items-center 
                    2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full 
                    ">
                      <GoogleMap5 latLng={latLng}/>
                    </div>                    
                  </div>  
                </div>
                
                
                
                

              </div>

              

            </div>
          }

          
        </>
        :<LoginMove/>



      }
      
    </>
  );
};

export default Main