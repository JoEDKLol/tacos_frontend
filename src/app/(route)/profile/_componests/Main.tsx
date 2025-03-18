'use client';

import { ButtonCommentSave} from "@/app/components/common/buttonComponents/Button";
// import LoginMove from "@/app/components/common/LoginMove";
// import GoogleMap3 from "@/app/components/googleMap/GoogleMap3";
// import GoogleMapPopup from "@/app/components/googleMap/googleMapPopup";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
// import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { getDate } from "@/app/utils/common";
import Image from "next/image";
import {  useRouter, useSearchParams  } from "next/navigation";
// import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";


interface commentList {
  _id:string,
  commentseq : number
  restaurantseq : number
  comment : string
  restaurantinfo : {
    restaurantname:string
  }
  regdate : string
  lastCommentSeq : number
}

interface commentLists extends Array<commentList>{}

interface likeList {
  _id:string,
  restaurantlikeseq : number
  userseq : number
  restaurantseq : number
  restaurantinfo : {
    restaurantname:string
  }
  regdate : string
  lastLikeSeq : number
}

interface likeLists extends Array<likeList>{}



const Main = () => {

  // const userStateSet = userState();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  // const router = useRouter();
  



  const [userimg, setUserimg] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userseq, setUserseq] = useState<number>(0);
  
  const [comments, setComments] = useState<commentLists>([]);
  const [likes, setLikes] = useState<likeLists>([]);
  const [commentsCurrentSeq, setCommentsCurrentSeq] = useState<number>(0);
  const [likesCurrentSeq, setLikesCurrentSeq] = useState<number>(0);
  

  const [commentCnt, setCommentsCnt] = useState<number>(0);
  const [likesCnt, setLikesCnt] = useState<number>(0);

  const [selectedList, setSelectedList] = useState<number>(0);
  const [listLayOut1, setListLayOut1] = useState<string>(" text-[#006341] border-b-[#006341] ");
  const [listLayOut2, setListLayOut2] = useState<string>(" hover:text-[#819e94] hover:border-[#819e94] ");
  
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const router = useRouter();

  useEffect(()=>{
    if(userId){
      searchUserInfo();
    }
  },[]);


  async function searchUserInfo(){

    const obj = {
      _id:userId
    }

    const retObj = await transactionAuth("get", "searchprofile", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success==="y"){

      setUserimg(retObj.sendObj.resObj.searchUser.userimg);
      setUserseq(retObj.sendObj.resObj.searchUser.userseq);

      if(retObj.sendObj.resObj.searchUser.username){
        setUsername(retObj.sendObj.resObj.searchUser.username);
      }
    
      setComments(retObj.sendObj.resObj.searchComment);
      setLikes(retObj.sendObj.resObj.searchLike);
      setCommentsCnt(retObj.sendObj.resObj.commentsCnt);
      setLikesCnt(retObj.sendObj.resObj.likesCnt);
      setCommentsCurrentSeq(retObj.sendObj.resObj.lastCommentSeq);
      setLikesCurrentSeq(retObj.sendObj.resObj.lastLikeSeq);
    }
  }

  function selectList(list:number){
    setSelectedList(list);
    if(list === 0){ //hover:text-[#819e94] hover:border-[#819e94]
      setListLayOut1(" text-[#006341] border-b-[#006341] ");
      setListLayOut2("  hover:text-[#819e94] ")
    }else{
      setListLayOut1("  hover:text-[#819e94]  ");
      setListLayOut2(" text-[#006341] border-b-[#006341] ")
    }
  }

  async function commentNextSearchOnClickHandler(){
    const obj = {
      userid:userId, 
      currentSeq:commentsCurrentSeq
    }
    const retObj = await transactionAuth("get", "searchnextcomment", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success==="y"){
      
      if(retObj.sendObj.resObj.comments.length > 0){
        setCommentsCurrentSeq(retObj.sendObj.resObj.lastCommentSeq);
        comments.push(...retObj.sendObj.resObj.comments);
        setComments(comments);
      }
    }
  }

  async function likeNextSearchOnClickHandler(){
    const obj = {
      userseq:userseq, 
      currentSeq:likesCurrentSeq
    }
    const retObj = await transactionAuth("get", "searchnextlike", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success==="y"){
      if(retObj.sendObj.resObj.likes.length > 0){
        setLikesCurrentSeq(retObj.sendObj.resObj.lastLikeSeq);
        likes.push(...retObj.sendObj.resObj.likes);
        setLikes(likes);
      }
    }
  }

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < username.length; i++) {
      const currentByte = username.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setUsername(username.substring(0, i));
        break;
      }
    }
  },[username]);


  function commentRestaurantNameOnClickHandler(restaurantName:string){
    router.push('/' + restaurantName);
  }

  return(
    <>{
      // (userStateSet.id)?
      <div className="">

        

        <div className="">
          
          <div className="mb-1">
            <div className="flex justify-center items-center h-10  bg-[#006341]">
              <p className="text-white text-xl">Profile</p>
            </div>
          </div>

          

        
          <div className="flex justify-center mt-10 w-[100%]">
            {
            //profile/////////////////////////////////////////////////////////// 
            <div className="flex justify-center w-full">
              <div className="flex flex-col w-[80%]">
                  

                <div className="grid  mt-2 
                2xl:justify-normal xl:justify-normal lg:justify-normal md:justify-normal sm:col-1
                2xl:flex xl:flex lg:flex md:flex sm:grid
                ">  

                  <div className="">
                    <div className="flex justify-center
                    2xl:justify-normal xl:justify-normal lg:justify-normal md:justify-normal sm:justify-center 
                    ">
                      <div className='ring-1 w-[200px] h-[200px] ring-[#006341] rounded relative ' >
                        
                        
                        
                        {
                          (userimg)?
                          <Image 
                          src={userimg}
                          quality={30}
                          layout="fill"
                          style={{ objectFit: "cover" , borderRadius: '5px' }}
                          alt='' />
                          :""
                        }
                      </div> 

                      
                      
                    </div>
                    
                    <div className="flex justify-center mt-2">
                      
                      <span className="font-bold mt-2 text-[#006341]">{username}</span>
                      
                    </div>
                    <div className="flex justify-center mt-2 text-[#006341] ">
                      <p className=" text-lg"><MdOutlineComment/></p>
                      <p className="ms-1 text-sm me-3">{commentCnt}</p>
                      <p className=" text-lg"><AiFillLike/></p>
                      <p className="ms-1 text-sm ">{likesCnt}</p>
                      
                    </div>

                    <div className="flex justify-center mt-2 border-t pt-2 border-[#006341]">
                      <p className="w-[200px] justify-normal text-gray-500 ">
                        <span 
                        onClick={()=>selectList(0)}
                        className={ listLayOut1 + " cursor-pointer "}>
                          Comments
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex justify-center mt-2 mb-5 pb-2 border-b border-[#006341]">
                      <p className="w-[200px] justify-normal text-gray-500 ">
                        
                        <span 
                        onClick={()=>selectList(1)}
                        className={listLayOut2 + "  cursor-pointer "}>
                          Likes
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className=" w-full h-full ">
                  {
                    (selectedList === 0)?
                    // comments list
                    <div>
                      {
                        comments.map((value:any, index:any) => {
                          return (
                            <div key={value._id + index + ""} 
                            className="w-full px-5 mb-5"
                            >
                              <div className="flex justify-between mb-2">
                                <p 
                                onClick={()=>commentRestaurantNameOnClickHandler(value.restaurantinfo.restaurantname)}
                                className="text-2xl font-bold text-[#006341] cursor-pointer
                                whitespace-pre-line break-words  line-clamp-1
                                hover:text-[25px]
                                ">
                                  {value.restaurantinfo.restaurantname}
                                </p>
                                <p className=" flex items-center text-xs text-[#006341]
                                
                                ">
                                  <span className="whitespace-pre-line break-words  line-clamp-1">{getDate(value.regdate)}</span>
                                </p>
                              </div>
                              <div className="w-full rounded h-[120px]">
                                <textarea
                                disabled={true}
                                spellCheck={false} 
                                value={value.comment} 
                                className="
                                resize-none border w-full h-full px-2 py-1 text-sm bg-slate-100
                                focus:border-[#006341] focus:bg-white text-[#006341] outline-none rounded
                                "
                                />

                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="w-full p-2 mb-5">
                        <div className="flex justify-end">
                        {
                          (comments.length > 0)?
                          <ButtonCommentSave
                          onClick={()=>commentNextSearchOnClickHandler()}
                          name={"next"}/>
                          :""
                        }
                        </div>
                      </div>
                    </div>
                    
                    :
                    <div>
                    {/* likes */}
                      {
                        likes.map((value:any, index:any)=>{
                          return (
                            <div key={value._id + index}
                            className="w-full px-5  ">

                                <div className="flex justify-normal w-full h-[65px] pb-3 mb-3 border-b border-[#006341]">
                                  <div className="flex items-center">
                                  
                                    {
                                    (value.restaurantinfo.thumbImg)?
                                    <div className='ring-1 w-[55px] h-[55px] ring-[#006341] rounded relative ' >
                                    <Image 
                                    src={value.restaurantinfo.thumbImg}
                                    quality={30}
                                    layout="fill"
                                    style={{ objectFit: "cover" , borderRadius: '5px' }}
                                    alt='' />
                                    </div>
                                    :""
                                    }
                                    
                                  </div>
                                  <div className=" ms-2  ">
                                    <p className="text-base font-bold text-[#006341] ">
                                      <span 
                                      onClick={()=>commentRestaurantNameOnClickHandler(value.restaurantinfo.restaurantname)}
                                      className="cursor-pointer
                                      whitespace-pre-line break-words  line-clamp-1
                                      max-w-[190px] text-2xl
                                      hover:text-[25px]
                                      2xl:max-w-[450px] xl:max-w-[450px] lg:max-w-[350px] md:max-w-[350px] sm:max-w-[190px]
                                      ">
                                      {value.restaurantinfo.restaurantname}
                                      </span>
                                      
                                    </p>
                                    <p className="flex justify-normal text-sm text-[#006341] ">
                                      <span className="me-1 pt-0.5 text-xs
                                      2xl:text-sm xl:text-sm lg:text-sm md:text-xs sm:text-xs
                                      "><GoLocation/></span>
                                      <span className="text-xs
                                      whitespace-pre-line break-words  line-clamp-2
                                      2xl:text-sm xl:text-sm lg:text-sm md:text-xs sm:text-xs
                                      ">{value.restaurantinfo.address}</span>
                                    </p>
                                  </div>
                                  
                                </div>
                                      
                              

                            </div>
                          )
                        })
                      }
                      <div className="w-full p-2 mb-5">
                        <div className="flex justify-end">
                        {
                          (comments.length > 0)?
                          <ButtonCommentSave
                          onClick={()=>likeNextSearchOnClickHandler()}
                          name={"next"}/>
                          :""
                        }
                        </div>
                      </div>

                    </div>
                  }  
                  </div>

                </div>

              </div>
            </div>
            }
            
            
          
          </div>
        

        </div>
        
      </div>

    }
    
    </>
  );
};

export default Main