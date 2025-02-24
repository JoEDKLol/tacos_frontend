'use client';
import { TbThumbUpFilled } from "react-icons/tb";
import { MdOutlineComment } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
import restaurantListState from "@/app/store/restaurantList";
import { ButtonComment, ButtonCommentSave, ButtonCommentSelected, ButtonNextSearcHome, ButtonTagHome } from "@/app/components/common/buttonComponents/Button";
import searchConditionsState from "@/app/store/searchConditions";
import { useEffect, useRef, useState } from "react";
import { transaction } from "@/app/utils/axios";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import { useRouter } from "next/navigation";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { checkInputNull } from "@/app/utils/checkUserValidation";


const Main = () => {
  const userStateSet = userState();
  const router = useRouter();
  const restaurantListSet = restaurantListState();
  const searchConditionsSet = searchConditionsState();
  const [currnetPage, setCurrentPage] = useState<number>(1);
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const [commentSearchScreenYn, setCommentSearchScreenYn] = useState(false);
  
  const focusCommentListRef = useRef<null[] | HTMLTextAreaElement[]>([]);
  const [regCommnetIndex, setRegCommnetIndex] = useState<any>(-1);

  async function nextSearch(){
    const searchObj = searchConditionsSet.searchCondition;
    const obj={
      currentPage:currnetPage+1, 
      hashTagList:searchObj.hashTagList, 
      keyword:searchObj.keyword,
    }

    const retObj = await transaction("get", "res/searchreslisthome", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.resObj.length > 0){
      restaurantListSet.restaurantListAdd(retObj.sendObj.resObj);
      setCurrentPage(currnetPage+1);
    }
  }

  function restaurantClickHandler(name:string){
    router.push('/' + name);
  }


  useEffect(()=>{
    if(regCommnetIndex > -1){
			focusCommentListRef.current[regCommnetIndex]?.focus();
		}
  },[regCommnetIndex])

  useEffect(()=>{
    focusCommentListRef.current[regCommnetIndex]?.focus();
  },[restaurantListSet]); 

  function commentOnClickHandler(seq:number, blockState:string, index:number){
    const choosenIndex = restaurantListSet.restaurantList.findIndex((val) => val.restaurantseq === seq);
    restaurantListSet.restaurantList[choosenIndex].commentScreen = blockState;
    restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
    
    

    if(userStateSet.id){
      setRegCommnetIndex(index);
    }

    setCommentSearchScreenYn(!commentSearchScreenYn);

    if(blockState === "block"){
      commentSearchOnClickHandler(seq);
    }


  }

  

  async function commentSaveOnClickHandler(restaurantseq:number, index:number){

    if(!userStateSet.id){
      errorShow.messageSet("Signin is required.");
      errorShow.screenShowTrue();
      return;
    }

    setRegCommnetIndex(index);
    const choosenIndex = restaurantListSet.restaurantList.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurantListSet.restaurantList[choosenIndex].validationMsg = "";
    restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);

    

    if(!checkInputNull(restaurantListSet.restaurantList[choosenIndex].currentComment)){
      focusCommentListRef.current[regCommnetIndex]?.focus();
      restaurantListSet.restaurantList[choosenIndex].validationMsg = "Please check comment.";
      restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);

      return;
    }

    const obj = {
      userid:userStateSet.id,
      email : userStateSet.email,
      restaurantseq : restaurantseq,
      comment : restaurantListSet.restaurantList[choosenIndex].currentComment, 
    } 

    const retObj = await transactionAuth("post", "res/commentsave", obj, "", false, true, screenShow, errorShow);
    

    if(retObj.sendObj.success === 'y'){
      restaurantListSet.restaurantList[choosenIndex].currentComment = ""
      restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
    }else{

    }
  }

  async function commentSearchOnClickHandler(restaurantseq:number){

    const choosenIndex = restaurantListSet.restaurantList.findIndex((val) => val.restaurantseq === restaurantseq);

    const obj = {
      restaurantseq : restaurantseq, 
      currentSeq : restaurantListSet.restaurantList[choosenIndex].currentCommentSeq, 
    } 

    const retObj = await transaction("get", "res/commentsearch", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === 'y'){
      if(retObj.sendObj.resObj.comments.length > 0){
        restaurantListSet.restaurantList[choosenIndex].comments = retObj.sendObj.resObj.comments;
        restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
      }
    }
  }

  function commentOnchangeHandler(e:any, seq:number, index:number){
    setRegCommnetIndex(index)
    const choosenIndex = restaurantListSet.restaurantList.findIndex((val:any) => val.restaurantseq === seq);
    restaurantListSet.restaurantList[choosenIndex].currentComment = e.target.value;

    let totalByte = 0;
    for(let i =0; i < restaurantListSet.restaurantList[choosenIndex].currentComment.length; i++) {
      const currentByte = restaurantListSet.restaurantList[choosenIndex].currentComment.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 500){
        restaurantListSet.restaurantList[choosenIndex].currentComment = restaurantListSet.restaurantList[choosenIndex].currentComment.substring(0, i);
        break;
      }
    }


    restaurantListSet.restaurantListSet(restaurantListSet.restaurantList);
  }

  return(
    <div className="">  
      <div className="w-full">
        {
          restaurantListSet.restaurantList.map((data:any, index:any)=>{ 
            return (
              <div key={index + data.restaurantseq + data.restaurantname}>  
                <div className="flex justify-center mt-5 w-[100%] ">
                  <div className="flex flex-col w-[80%] border-2 border-[#006341]  rounded hover:shadow-lg hover:shadow-green-900/50  ">
                    <div 
                    // onClick={()=>restaurantClickHandler(data.restaurantname)}
                    className="  flex justify-normal ">
                      
                      <div className="flex justify-center items-top mt-2">
                        <div className="hidden ps-2 rounded
                        2xl:block xl:block lg:block md:block sm:hidden

                        ">
                          
                          
                          {
                            (data.img)?
                            <p className="  w-[200px] h-[200px] relative  ">
                              <Image
                              src={data.img}
                              alt=""
                              quality={30} // 이미지 품질, 기본값 75
                              layout="fill"
                              style={{ objectFit: "cover", borderRadius: '12px' }}
                              />
                            </p>
                            :""
                          }
                          
                        </div>
                      </div>
                      <div className="flex flex-col pt-2 ps-4 pe-4 pb-1 w-full ">

                        <div className="flex justify-center rounded mb-2
                        2xl:hidden xl:hidden lg:hidden md:hidden sm:flex
                        ">
                          
                            {
                            (data.img)?
                            <p className="  w-[200px] h-[200px] relative  ">
                              <Image
                              src={data.img}
                              alt=""
                              quality={30} // 이미지 품질, 기본값 75
                              layout="fill"
                              style={{ objectFit: "cover" , borderRadius: '12px'}}
                              />
                            </p>
                            :
                            ""
                            }
                            
                          
                        </div>


                        <div className="">
                          <p 
                          // onClick={()=>restaurantClickHandler(data.restaurantname)} 
                          className="text-3xl font-bold break-words  ">
                          {data.restaurantname}
                          </p>
                        </div> 
                        <p className="flex justify-normal mt-2 ms-2">
                          <span className=" text-lg"><TbThumbUpFilled/></span>
                          <span className="ms-1 text-sm">{data.likeCounts}</span>
                          <span className="ms-3 text-lg"><MdOutlineComment/></span>
                          <span className="ms-1 text-sm">{data.commentCounts}</span>
                          <span className="ms-3 text-lg hidden
                          2xl:block xl:block lg:block md:block sm:hidden
                          "><GoLocation/></span>
                          <span className="ms-1 text-sm hidden
                          2xl:block xl:block lg:block md:block sm:hidden
                          ">{data.address}</span>
                        </p>
                        <p className="flex justify-normal mt-2
                        2xl:hidden xl:hidden lg:hidden md:hidden sm:flex
                        ">
                          <span className="text-lg "><GoLocation/></span>
                          <span className="ms-1 text-sm ">{data.address}</span>
                        </p>

                        <p className="flex flex-col mt-2 w-full  ">
                          
                          <span className="text-sm font-bold ">Introduction</span>
                          <span className=" text-sm h-[50px] break-words line-clamp-3 ">
                          {data.introduction} 
                          </span>

                        </p>

                        <div className="flex justify-normal flex-wrap border-[#006341]  ">

                          {
                            data.hashtags.map((data:any, index:any)=>{
                              return (
                                <div key={index +  Math.random()}>
                                  <ButtonTagHome  name={data}/> 
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>

                    </div>
                    <div className="flex justify-end border-t pt-2 pb-2 px-1 mt-1 mx-1 border-[#006341]  ">
                      <p className="me-1">
                        {
                          (data.commentScreen === "hidden")?
                          <ButtonComment
                          onClick={()=>commentOnClickHandler(data.restaurantseq, "block", index)}
                          name={"comment"}/>:
                          <ButtonCommentSelected
                          onClick={()=>commentOnClickHandler(data.restaurantseq, "hidden", -1)}
                          name={"comment"}/>
                        }
                      </p>
                      <p>
                        <ButtonComment 
                        onClick={()=>restaurantClickHandler(data.restaurantname)} 
                        name={"visit"}/>
                      </p>
                      
                    </div>
                    <div className={data.commentScreen + " mx-2 mb-2   "}>
                      <div className="rounded pt-1 px-1 ">
                        <textarea
                        disabled={(userStateSet.id)?false:true}
                        spellCheck={false} 
                        ref={(element) => {focusCommentListRef.current[index] = element;}}
                        onChange={(e)=>commentOnchangeHandler(e, data.restaurantseq, index)}
                        value={data.currentComment} 
                        id=""  className="
                        resize-none border w-full h-[120px] px-2 py-1 text-sm 
                        focus:border-[#006341] text-[#006341] outline-none rounded
                        focus:bg-white bg-slate-200
                        "
                        />

                        <div className="flex justify-between ">
                        <p className="text-red-500 text-xs">{data.validationMsg}</p>
                        <p>
                          <ButtonCommentSave 
                          onClick={()=>commentSaveOnClickHandler(data.restaurantseq, index)}
                          name={"save"}/>
                        </p>
                      </div>
                      
                      <div className=" mt-1 p-1  ">

                        {
                          data.comments.map((val:any, index:any)=>{
                            return ( 
                              <div key={val._id+ index}>
                                <div className="border-2 mb-2 rounded border-[#006341]  ">
                                  <div className="mx-1 my-2 flex flex-between">
                                    <p className="bg-white border border-[#006341] font-bold  px-2 py-1 text-xs rounded">{val.userinfo.email}</p>
                                  </div>
                                  <div className=" px-1 pb-1 h-[120px] flex items-end">
                                    <textarea   
                                    spellCheck={false} 
                                    readOnly
                                    // ref={(element) => {focusCommentListRef.current[index] = element;}}
                                    // onChange={(e)=>commentOnchangeHandler(e, data.restaurantseq, index)}
                                    // onFocus={(e)=>e.target.value = e.target.value}
                                    // value={(commentList.length > 0)?commentList[0].comment:""}
                                    // value={(commentList.length > 0)?commentList[0].comment:index}
                                    value={val.comment} 
                                    id=""  className="
                                    resize-none border w-full h-full px-2 py-1 text-sm bg-slate-200
                                    focus:border-[#006341] focus:bg-white text-[#006341] outline-none rounded
                                    
                                    "
                                    
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                        <div className="flex justify-end ">
                        {
                          (data.comments.length > 0)?
                          <ButtonCommentSave 
                          // onClick={()=>commentSaveOnClickHandler(data.restaurantseq, index)}
                          name={"next"}/>
                          :""
                        }
                        
                         </div>

                        </div>

                      </div>

                      
                     
                    </div>
                    
                  </div>
                </div>
              </div>
            )
          })
        }

        <div className="flex justify-center mt-2 w-[100%]">
          <div className="flex justify-end w-[80%]">
            {
              (restaurantListSet.restaurantList.length > 0)?
              <ButtonNextSearcHome onClick={()=>nextSearch()} name={"NEXT"}/>
              :""
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Main