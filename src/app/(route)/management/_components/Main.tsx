'use client';

import { ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import Image from "next/image";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface restaurantList {
  userseq : number
  restaurantseq : number
  restaurantname : string
}

interface restaurantLists extends Array<restaurantList>{}


const Main = () => {

  const userStateSet = userState();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  // const router = useRouter();
  const [restaurant, setRestaurant] = useState<restaurantLists>([]);
  const [regScreenYn, setRegScreenYn] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [img, setImg] = useState<string>("");

  useEffect(()=>{
    //유저번호로 레스토랑 정보 조회해 온다. 
    searchRestaurantLists();

  },[]);

  useEffect(()=>{
    //유저번호로 레스토랑 정보 조회해 온다.
    // searchRestaurantLists();
    console.log("여기::" + restaurant); 

  },[restaurant]);

  
  
  async function searchRestaurantLists(){
    const obj = {
      userseq:userStateSet.userseq
    }
    const retObj = await transactionAuth("get", "res/searchreslist", obj, "", false, true, screenShow, errorShow);
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
    // setImgDelete(true);
  }

  async function saveOnClick(){
    const obj = {
      userseq:userStateSet.userseq,
      restaurantname:restaurantName,
      email:userStateSet.email

    }

    console.log(obj);

    const retObj = await transactionAuth("post", "res/restaurantnewsave", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success==="y"){
      // setRestaurant(retObj.sendObj.resObj);
      
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
              <>
              
              </>
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
              <div className="w-full mt-2 ">
                
                <div className="grid place-items-center grid-cols-1">
                  
                  <div className="flex justify-center  w-[350px]">
                    <p className="w-[100px] mr-2 text-[#006341] font-bold text-sm flex justify-end items-center">Name</p>
                    <p className="w-[250px]">
                    <input type="text" 
                        onChange={(e)=>restaurantNameOnChange(e)}
                        className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                        value={restaurantName}/>
                    </p>
                  </div>
                  <div className="flex justify-center  w-[350px] mt-2">
                    <p className="w-[100px] mr-2 text-[#006341] font-bold text-sm flex justify-end items-center">Image</p>
                    <div className="w-[250px] flex justify-center">
                      <div className='ring-1 w-[150px] h-[150px] ring-gray-300 rounded-xl relative ' >
                      {img ? (
                        
                            <Image 
                            src={img}
                            quality={30}
                            layout="fill"
                            style={{ objectFit: "cover" , borderRadius: '10px' }}
                            alt='' />
                        ) : ""
                      }
                      
                      </div>
                      
                    </div>
                  </div> 
                  <div className="flex justify-center  w-[350px] mt-2">
                    <p className="w-[100px] mr-2 text-[#006341] font-bold text-sm"></p>
                    <p className="w-[250px] flex justify-center">
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
                    </p>
                  </div>

                  <div className="flex justify-center  w-[350px] mt-2">
                    <p className="w-[100px] mr-2 text-[#006341] font-bold text-sm flex justify-end items-center">Location</p>
                    <p className="w-[250px] flex justify-center"></p>
                  </div>

                  <div className="flex justify-end  w-[350px] mt-2">
                    <ButtonSmall onClick={()=>saveOnClick()} name={"SAVE"}/> 
                  </div>
                   
                </div>


                
                





              </div>

              
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