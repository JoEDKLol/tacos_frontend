'use client';
// import { TbThumbUpFilled } from "react-icons/tb";
import { AiFillLike } from "react-icons/ai";
// import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
import restaurantListState from "@/app/store/restaurantList";
import { ButtonComment, ButtonCommentSave, ButtonCommentSelected, ButtonDisLike, ButtonLike, ButtonLikeNotWorking, ButtonNextSearcHome, ButtonTagHome } from "@/app/components/common/buttonComponents/Button";
import searchConditionsState from "@/app/store/searchConditions";
import { useEffect, useRef, useState } from "react";
import { transaction } from "@/app/utils/axios";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import { useRouter } from "next/navigation";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { checkInputNull } from "@/app/utils/checkUserValidation";
import { getDate } from "@/app/utils/common";


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

  const focusRegCommentListRef = useRef<null[] | HTMLTextAreaElement[]>([]);
  const [regCommentListIndex, setRegCommentListIndex] = useState<any>(-1);

  async function nextSearch(){
    const searchObj = searchConditionsSet.searchCondition;
    const obj={
      currentPage:currnetPage+1, 
      hashTagList:searchObj.hashTagList, 
      keyword:searchObj.keyword,
    }

    const retObj = await transaction("get", "res/searchreslisthome", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.resObj.length > 0){

      for(let i=0; i<retObj.sendObj.resObj.length; i++){
        retObj.sendObj.resObj[i].commentScreen = "hidden";
        retObj.sendObj.resObj[i].comments = [];
        retObj.sendObj.resObj[i].currentComment = "";
        retObj.sendObj.resObj[i].currentCommentSeq = 0;
        retObj.sendObj.resObj[i].validationMsg = "";
        retObj.sendObj.resObj[i].lastCommentSeq = 0;
      
        if(userStateSet.id){
          const index = userStateSet.likesArr.findIndex((val:any) => val.restaurantseq === retObj.sendObj.resObj[i].restaurantseq);
          if(index > -1){
            if(userStateSet.likesArr[index].likeyn === "y"){
              retObj.sendObj.resObj[i].userLike = "y";
            }else{
              retObj.sendObj.resObj[i].userLike = "n";
            }
          }
        }
      }

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

    if(regCommnetIndex > -1){
      focusCommentListRef.current[regCommnetIndex]?.focus();
    }

    if(regCommentListIndex > -1){
      focusRegCommentListRef.current[regCommentListIndex]?.focus();
    }

  },[restaurantListSet]); 

  useEffect(()=>{
    if(regCommentListIndex > -1){
			focusRegCommentListRef.current[regCommentListIndex]?.focus();
		}
  },[regCommentListIndex])

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
      // restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);

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
      restaurantListSet.restaurantList[choosenIndex].comments.unshift(retObj.sendObj.resObj.saveComment);
      restaurantListSet.restaurantList[choosenIndex].commentCounts = retObj.sendObj.resObj.commentCounts;
      restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
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

        for(let i=0; i<retObj.sendObj.resObj.comments.length; i++){
          retObj.sendObj.resObj.comments[i].updateYn = true;
        }

        // console.log(retObj.sendObj.resObj.lastCommentSeq);

        restaurantListSet.restaurantList[choosenIndex].lastCommentSeq = retObj.sendObj.resObj.lastCommentSeq;
        restaurantListSet.restaurantList[choosenIndex].comments = retObj.sendObj.resObj.comments;
        restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
      }
    }
  }

  function commentOnchangeHandler(e:any, seq:number, index:number){
    setRegCommentListIndex(-1);
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

  function commentUpdateOnchangeHandler(e:any, restaurantseq:number, commentId:any, index:number){
    setRegCommnetIndex(-1);
    setRegCommentListIndex(index);
    const choosenIndex = restaurantListSet.restaurantList.findIndex((val:any) => val.restaurantseq === restaurantseq);
    const commentIndex = restaurantListSet.restaurantList[choosenIndex].comments.findIndex((val2:any) => val2._id === commentId);
    restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment = e.target.value;

    let totalByte = 0;
    for(let i =0; i < restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment.length; i++) {
      const currentByte = restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 500){
        restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment = restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment.substring(0, i);
        break;
      }
    }
    
    
    // restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment = e.target.value;
    restaurantListSet.restaurantListSet(restaurantListSet.restaurantList);
  }

  function commentUpdateOnClickHandler(restaurantseq:number, commentId:any, index:number, updateYn:boolean){
    setRegCommnetIndex(-1);
    setRegCommentListIndex(index);
    const choosenIndex = restaurantListSet.restaurantList.findIndex((val:any) => val.restaurantseq === restaurantseq);
    const commentIndex = restaurantListSet.restaurantList[choosenIndex].comments.findIndex((val2:any) => val2._id === commentId);
    restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].updateYn = updateYn;

  }

  async function commentUpdateSaveOnClickHandler(restaurantseq:number, commentId:any, index:number){
    setRegCommnetIndex(-1);
    setRegCommentListIndex(index);

    const choosenIndex = restaurantListSet.restaurantList.findIndex((val:any) => val.restaurantseq === restaurantseq);
    const commentIndex = restaurantListSet.restaurantList[choosenIndex].comments.findIndex((val2:any) => val2._id === commentId);


    if(!checkInputNull(restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment)){
      focusRegCommentListRef.current[index]?.focus();
      return;
    }

    const obj = {
      email : userStateSet.email,
      restaurantseq : restaurantseq,
      comment : restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].comment,
      commentseq : restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].commentseq,
    } 

    const retObj = await transactionAuth("post", "res/commentupdate", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === 'y'){
      restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].updateYn = true;
      setRegCommentListIndex(-1);
    }
  }

  async function commentDeleteOnClickHandler(restaurantseq:number, commentId:any, index:number){
    setRegCommnetIndex(-1);
    setRegCommentListIndex(index);

    const choosenIndex = restaurantListSet.restaurantList.findIndex((val:any) => val.restaurantseq === restaurantseq);
    const commentIndex = restaurantListSet.restaurantList[choosenIndex].comments.findIndex((val2:any) => val2._id === commentId);

    const obj = {
      restaurantseq : restaurantseq,
      commentseq : restaurantListSet.restaurantList[choosenIndex].comments[commentIndex].commentseq,
    } 

    const retObj = await transactionAuth("post", "res/commentdelete", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === 'y'){
      setRegCommentListIndex(-1);
      restaurantListSet.restaurantList[choosenIndex].commentCounts = retObj.sendObj.resObj.commentCounts;
      restaurantListSet.restaurantList[choosenIndex].comments.splice(index, 1);
    }
  }

  async function commentNextSearchOnClickHandler(restaurantseq:number){

    setRegCommnetIndex(-1);
    setRegCommentListIndex(-1);

    const choosenIndex = restaurantListSet.restaurantList.findIndex((val) => val.restaurantseq === restaurantseq);
    
    console.log(restaurantListSet.restaurantList[choosenIndex].lastCommentSeq);

    if(restaurantListSet.restaurantList[choosenIndex].lastCommentSeq === 0){
      return;
    }

    const obj = {
      restaurantseq : restaurantseq, 
      currentSeq : restaurantListSet.restaurantList[choosenIndex].lastCommentSeq
    } 

    const retObj = await transaction("get", "res/commentsearch", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === 'y'){
      if(retObj.sendObj.resObj.comments.length > 0){

        for(let i=0; i<retObj.sendObj.resObj.comments.length; i++){
          retObj.sendObj.resObj.comments[i].updateYn = true;
        }

        restaurantListSet.restaurantList[choosenIndex].lastCommentSeq = retObj.sendObj.resObj.lastCommentSeq;
        restaurantListSet.restaurantList[choosenIndex].comments.push(...retObj.sendObj.resObj.comments);
        restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
      }
    }
  }

  async function likeClickHandler(likeyn:string, restaurantseq:number, restaurantId:any){

    setRegCommnetIndex(-1);
    setRegCommentListIndex(-1);

    const obj = {
      userseq:userStateSet.userseq,
      email : userStateSet.email,
      restaurantseq : restaurantseq,
      restaurantinfo : restaurantId, 
      likeyn : likeyn
    }

    // console.log(obj);

    const retObj = await transactionAuth("post", "res/likeupdate", obj, "", false, true, screenShow, errorShow);
    // console.log(retObj);
    if(retObj.sendObj.success === 'y'){
      const choosenIndex = restaurantListSet.restaurantList.findIndex((val) => val.restaurantseq === restaurantseq);
      restaurantListSet.restaurantList[choosenIndex].likeCounts = retObj.sendObj.resObj.likeCounts;
      restaurantListSet.restaurantList[choosenIndex].userLike = retObj.sendObj.resObj.userLike;
      restaurantListSet.restaurantListSet([...restaurantListSet.restaurantList]);
      
    }
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
                          <span className=" text-lg"><AiFillLike/></span>
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
                      <p className="me-1">
                        <ButtonComment 
                        onClick={()=>restaurantClickHandler(data.restaurantname)} 
                        name={"visit"}/>
                      </p>
                      


                      {
                        (userStateSet.id)?
                        (data.userLike === "y")?
                        <p>
                          <ButtonLike 
                          onClick={()=>likeClickHandler("n", data.restaurantseq, data._id)} 
                          />
                        </p>
                        :
                        <p>
                          <ButtonDisLike 
                          onClick={()=>likeClickHandler("y", data.restaurantseq, data._id)} 
                          />
                        </p>
                        :
                        <p>
                          <ButtonLikeNotWorking/>
                        </p>

                      }


                      


                      
                      
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
                        border-[#006341]
                        text-[#006341] outline-none rounded
                        bg-white 
                        "
                        />

                        <div className="flex justify-between ">
                        <p className="text-red-500 text-xs">{data.validationMsg}</p>
                        <p className="">
                          <ButtonCommentSave
                          onClick={()=>commentSaveOnClickHandler(data.restaurantseq, index)}
                          name={"save"}/>
                        </p>
                      </div>
                      
                      <div className=" mt-1 p-1  ">

                        {
                          data.comments.map((val:any, index2:any)=>{
                            return ( 
                              <div key={val._id+ index2}>
                                <div className="border-2 mb-2 rounded border-[#006341]  ">
                                  <div className="mx-1 my-2 flex justify-between w-full">
                                    <p className="">
                                      <span className="bg-white border border-[#006341] px-1 py-0.5 text-xs rounded">
                                      {
                                      (!val.userinfo.name)?"guest":""
                                      
                                      }

                                      </span>
                                      <span className="ms-1 text-xs">
                                        {getDate(val.regdate)}
                                      </span>
                                      
                                    </p>
                                    {
                                      (val.userinfo._id === userStateSet.id)?
                                      <p className="flex items-end me-2">


                                        {
                                          (val.updateYn)?
                                          <ButtonCommentSave 
                                          onClick={()=>commentUpdateOnClickHandler(data.restaurantseq, val._id, index2, false)}
                                          name={"update"}/>
                                          :<ButtonCommentSave 
                                          onClick={()=>commentUpdateSaveOnClickHandler(data.restaurantseq, val._id, index2)}
                                          name={"save"}/>
                                        }
                                        <span className="ms-1">
                                          <ButtonCommentSave 
                                          onClick={()=>commentDeleteOnClickHandler(data.restaurantseq, val._id, index2)}
                                          name={"delete"}/>
                                        </span>
                                        
                                      </p>
                                      :""
                                    }
                                    
                                  </div>
                                  <div className=" px-1 pb-1 h-[120px] flex items-end">
                                    <textarea   
                                    spellCheck={false} 
                                    disabled={val.updateYn}
                                    ref={(element) => {focusRegCommentListRef.current[index2] = element;}}
                                    onChange={(e)=>commentUpdateOnchangeHandler(e, data.restaurantseq, val._id, index2)}
                                    value={val.comment} 
                                    id=""  className="
                                    resize-none border w-full h-full px-2 py-1 text-sm bg-slate-100
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
                          onClick={()=>commentNextSearchOnClickHandler(data.restaurantseq)}
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