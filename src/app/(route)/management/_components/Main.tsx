'use client';

import { ButtonSmall, ButtonSmallMove } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { transactionFile } from "@/app/utils/axiosFile";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface restaurantList {
  userseq : number
  restaurantseq : number
  restaurantname : string
  address : string
  img : string
  thumbImg : string
  errMsg : string
}

interface restaurantLists extends Array<restaurantList>{
  
}


const Main = () => {

  const userStateSet = userState();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  // const router = useRouter();
  const [restaurant, setRestaurant] = useState<restaurantLists>([]);
  const [regScreenYn, setRegScreenYn] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<any>("");

  const focusRestaurantName = useRef<HTMLInputElement>(null);

  const focusRestaurantNameList = useRef<null[] | HTMLInputElement[]>([]);
  const [restaurantNameIndex, setRestaurantNameIndex] = useState<any>(-1);
  const [currentFocusRestaurantName, setCurrentFocusRestaurantName] = useState<boolean>(false);

  const focusRestaurantAddressList = useRef<null[] | HTMLInputElement[]>([]);
  const [restaurantAddressIndex, setRestaurantAddressIndex] = useState<any>(-1);
  const [currentFocusRestaurantAddress, setCurrentFocusRestaurantAddress] = useState<boolean>(false);


  useEffect(()=>{
    //유저번호로 레스토랑 정보 조회해 온다. 
    searchRestaurantLists();
  },[userStateSet]);


  useEffect(()=>{
  
    if(currentFocusRestaurantName){
      focusRestaurantNameList.current[restaurantNameIndex]?.focus();
    }

    if(currentFocusRestaurantAddress){
      focusRestaurantAddressList.current[restaurantAddressIndex]?.focus();
    }
  
  
  },[restaurant]); 

  
  useEffect(()=>{
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\_+┼<>@\#$%&\'\"\\\(\=]/gi; 
    let totalByte = 0;

    setRestaurantName(restaurantName.replaceAll(regExp, ""));

    for(let i =0; i < restaurantName.length; i++) {
      const currentByte = restaurantName.charCodeAt(i);
      
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setRestaurantName(restaurantName.substring(0, i));
        break;
      }
    }
  },[restaurantName]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < restaurantAddress.length; i++) {
      const currentByte = restaurantAddress.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 80){
        setRestaurantAddress(restaurantAddress.substring(0, i));
        break;
      }
    }
  },[restaurantAddress]);

  
  
  async function searchRestaurantLists(){
    
    if(userStateSet.userseq === 0){
      return;
    }
    
    const obj = {
      userseq:userStateSet.userseq
    }
    
    const retObj = await transactionAuth("get", "res/searchreslist", obj, "", false, true, screenShow, errorShow);
    console.log(retObj.sendObj.resObj);
    if(retObj.sendObj.success==="y"){
      setRestaurant(retObj.sendObj.resObj);
      
    }
  }

  function regScreenOnClick(){
    setRegScreenYn(!regScreenYn);
  }

  function restaurantNameOnChange(e:any){
    setRestaurantName(e.target.value)
  }

  function restaurantAddressOnChange(e:any){
    setRestaurantAddress(e.target.value)
  }
  
  // function movetoHeaderUpdateOnclickHandler(){
  //   router.push('/' + userStateSet.userseq + "/headerupdate")
  // }

  // function movetoMainUpdateOnclickHandler(){
  //   router.push('/' + userStateSet.userseq + "/homeupdate")
  // }

  // function movetoAboutUpdateOnclickHandler(){
  //   router.push('/' + userStateSet.userseq + "/aboutupdate")
  // }

  // function movetoMenuUpdateOnclickHandler(){
  //   router.push('/' + userStateSet.userseq + "/menuupdate")
  // }

  function deleteImg(){
    setImg("");
  }

  function eachDeleteImg(restaurantseq:any){
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].img = "";
    restaurant[choosenIndex].thumbImg = "";
    setRestaurant([...restaurant]);
  }

  function init(){
    setRestaurantName("");
    setRestaurantAddress("");
    setImg("");
    setThumbImg("");
  }


  async function saveOnClick(){
    setErrMsg("");
    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email, 
      restaurantname:restaurantName,
      address:restaurantAddress,
      img: img, 
      thumbImg : thumbImg
    }

    const retObj = await transactionAuth("post", "res/restaurantnewsave", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      setRegScreenYn(false);
      init();
      searchRestaurantLists();
    }else{
      setErrMsg(retObj.sendObj.message);
      // focusRestaurantName.current?.focus();
    }
  }

  async function fileUploadHandler(e:any){

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 

    const file = e.target.files[0]; 
    if(!file) return;
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      // maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };



    try {

      const compressedFile = await imageCompression(file, options);
      const imgUploadRes = await transactionFile("res/fileUpload", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        setImg(imgUploadRes.sendObj.resObj.img_url);
        setThumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {
      //console.log(error)
    }

  }

  function eachRestaurantNameOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(true);
    setCurrentFocusRestaurantAddress(false);
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].restaurantname = e.target.value;
    setRestaurantNameIndex(choosenIndex);
    setRestaurant([...restaurant]);
  }
  
  function eachRestaurantAddressOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(false);
    setCurrentFocusRestaurantAddress(true);
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].address = e.target.value;
    setRestaurantAddressIndex(choosenIndex);
    setRestaurant([...restaurant]);
  }

  async function eachFileUploadHandler(e:any, restaurantseq:any){

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
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
        restaurant[choosenIndex].img = imgUploadRes.sendObj.resObj.img_url;
        restaurant[choosenIndex].thumbImg = imgUploadRes.sendObj.resObj.img_url;
        setRestaurant([...restaurant]);

      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {

      
    }

  }

  async function updateOnClick(restaurantseq:any){
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    const obj = {
      restaurantseq:restaurantseq,
      userseq:userStateSet.userseq,
      email:userStateSet.email, 
      restaurantname:restaurant[choosenIndex].restaurantname,
      address:restaurant[choosenIndex].address, 
      img: restaurant[choosenIndex].img, 
      thumbImg : restaurant[choosenIndex].thumbImg
    }

    const retObj = await transactionAuth("post", "res/restaurantupdate", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      searchRestaurantLists();
    }else{
      restaurant[choosenIndex].errMsg = retObj.sendObj.message;
      setRestaurant([...restaurant]);
    }
    
  }

  async function deleteOnClick(restaurantseq:any){
    const obj = {
      restaurantseq:restaurantseq,
    }

    const retObj = await transactionAuth("post", "res/restaurantdelete", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      searchRestaurantLists();
    }else{
      const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
      restaurant[choosenIndex].errMsg = retObj.sendObj.message;
      setRestaurant([...restaurant]);
    }
  }

  return(
    <>{
      (userStateSet.id)?
      <div>
        
        <div className="mb-1">
          <div className="flex justify-center items-center h-10  bg-[#006341]">
            <p className="text-white text-xl">Management</p>
          </div>
        </div>
      
        <div className="flex justify-center mt-5 w-[100%]">
          <div className="flex flex-col w-[80%]">
            {
              (restaurant.length > 0)?
              <div>
                <div className="flex justify-end mt-2">
                  <ButtonSmall onClick={()=>regScreenOnClick()} name={"NEW"}/> 
                </div>
              </div>:""
            }
            

            {
              (restaurant.length > 0)?
              restaurant.map((item:any, index:any)=>
                  {
                    return (
                      <div key={index + item.restaurantseq + item.restaurantname}>
                        <div className="flex justify-center mt-2 p-2 border-2 border-[#006341] rounded">
                        <div className="w-[120px] me-2">
                          <div className='ring-1 w-[120px] h-[120px] ring-[#006341] rounded relative ' >
                            {item.img ? (
                              
                                  <Image 
                                  src={item.img}
                                  quality={30}
                                  layout="fill"
                                  style={{ objectFit: "cover" , borderRadius: '5px' }}
                                  alt='' />
                              ) : ""
                            }
                          </div> 

                          <div className="flex justify-center mt-1">
                            <div className="me-1">
                              <label className="cursor-pointer text-[10px] border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200" htmlFor={"file_input" + item.restaurantseq}>
                                  Upload Img 
                              </label>
                              <input className=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                              hidden
                              " id={"file_input" + item.restaurantseq} type="file"
                              accept="image/*" 
                              onChange={(e)=>eachFileUploadHandler(e, item.restaurantseq)}
                              />

                            </div>
                            <div className="" > 
                              <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                              htmlFor="img_delete"
                              onClick={()=>eachDeleteImg(item.restaurantseq)}
                              >
                                Delete
                              </label>
                            </div>
                          </div>

                        </div>
                        <div className="w-full rounded">
                          <div className="mb-1">
                            <div className="grid place-items-start grid-cols-3 w-[270px]
                            2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3
                            2xl:w-[350px] xl:w-[350px] lg:w-[350px] md:w-[350px] sm:w-[270px]
                            ">
                              <p className="pe-1 pb-1"><ButtonSmallMove name="main"/></p>
                              <p className="pe-1 pb-1"><ButtonSmallMove name="header"/></p>
                              <p className="pe-1 pb-1"><ButtonSmallMove name="home"/></p>
                              <p className="pe-1 pb-1"><ButtonSmallMove name="about"/></p>
                              <p className="pe-1 pb-1"><ButtonSmallMove name="menu"/></p>
                            </div>
                            <p className="text-sm font-bold mb-1 text-[#006341]">Restaurant name</p>
                            <p >
                              <input 
                              type="text" 
                              ref={(element) => {focusRestaurantNameList.current[index] = element;}}
                              onChange={(e)=>eachRestaurantNameOnChange(e, item.restaurantseq)}
                              className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                              value={item.restaurantname}
                              disabled
                              />
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-1 text-[#006341]">Address</p>
                            <p>
                              <input type="text" 
                              ref={(element) => {focusRestaurantAddressList.current[index] = element;}}
                              onChange={(e)=>eachRestaurantAddressOnChange(e, item.restaurantseq)}
                              className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                              value={item.address}/></p>
                          </div>
                          <div>
                          {/* <p className="mt-1 flex justify-center text-red-500 text-xs">{errMsg}</p> */}
                          </div>
                          <div className="flex justify-end mt-2">
                            <p className="me-1">
                              <ButtonSmall onClick={()=>updateOnClick(item.restaurantseq)} name={"UPDATE"}/>
                            </p>
                            <p>
                              <ButtonSmall onClick={()=>deleteOnClick(item.restaurantseq)} name={"DELETE"}/>
                            </p>
                          </div>
                        </div>
                      </div> 
                      </div>
                    )
                  }
                )
                
              // <div className="border">
              //   {restaurant[0].restaurantname as any}
              // </div>
              :
              <div className="w-full flex justify-center">
                <p className=" text-[#006341]">
                {`There are no registered restaurants.
                Would you like to register? `}
                <button
                onClick={()=>regScreenOnClick()} 
                className="cursor-pointer font-bold text-[#006341] hover:text-[#CE1126]">Yes
                </button></p>
              </div>
            }

            {
              (regScreenYn)?
              <>

              <div className="flex justify-center mt-2 p-2 border-2 border-[#006341] rounded">
                <div className="w-[120px] me-2">
                  <div className='ring-1 w-[120px] h-[120px] ring-[#006341] rounded relative ' >
                    {img ? (
                      
                          <Image 
                          src={img}
                          quality={30}
                          layout="fill"
                          style={{ objectFit: "cover" , borderRadius: '5px' }}
                          alt='' />
                      ) : ""
                    }
                  </div> 

                  <div className="flex justify-center mt-1">
                    <div className="me-1">
                      <label className="cursor-pointer text-[10px] border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200" htmlFor="file_input">
                          Upload Img 
                      </label>
                      <input className=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                      hidden
                      " id="file_input" type="file"
                      accept="image/*" 
                      onChange={(e)=>fileUploadHandler(e)}
                      />

                    </div>
                    <div className="" > 
                      <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                      htmlFor="img_delete"
                      onClick={()=>deleteImg()}
                      >
                        Delete
                      </label>
                    </div>
                  </div>

                </div>
                <div className="w-full rounded">
                  <div className="mb-1">
                    <p className="text-sm font-bold mb-1 text-[#006341]">Restaurant name</p>
                    <p >
                      <input 
                      ref={focusRestaurantName}
                      type="text" 
                      onChange={(e)=>restaurantNameOnChange(e)}
                      className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                      value={restaurantName}/>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1 text-[#006341]">Address</p>
                    <p>
                      <input type="text" 
                      onChange={(e)=>restaurantAddressOnChange(e)}
                      className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                      value={restaurantAddress}/></p>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1 text-[#006341]">Introduction</p>
                    <p>
                      <input type="text" 
                      onChange={(e)=>restaurantAddressOnChange(e)}
                      className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                      value={restaurantAddress}/></p>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1 text-[#006341]">HashTag</p>
                    <p className="flex justify-center w-full">
                      <input type="text" 
                      onChange={(e)=>restaurantAddressOnChange(e)}
                      className="text-[#aacfc2] border me-1 border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                      value={restaurantAddress}/>
                      <ButtonSmall  name={"ADD"}/> 
                    </p>
                  </div>
                  <div>
                    해시태그자리
                  </div>
                  <div>
                    <p className="mt-1 flex justify-center text-red-500 text-xs">{errMsg}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <ButtonSmall onClick={()=>saveOnClick()} name={"SAVE"}/> 
                  </div>
                </div>
              </div> 

              
              </>

              
              :
              <div></div>
            }
            
          </div>
        </div>


        {/* <p  
        onClick={()=>movetoHeaderUpdateOnclickHandler()}
        className="">Hearder Update</p>
        <p 
        onClick={()=>movetoMainUpdateOnclickHandler()}
        className="">Main Update</p>
        <p 
        onClick={()=>movetoAboutUpdateOnclickHandler()}
        className="">About Update</p>
        <p 
        onClick={()=>movetoMenuUpdateOnclickHandler()}
        className="">Menu Update</p> */}

      </div>
      :
      <LoginMove/>
    }
    
    </>
  );
};

export default Main