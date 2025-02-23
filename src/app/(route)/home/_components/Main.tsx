'use client';
import { TbThumbUpFilled } from "react-icons/tb";
import { MdOutlineComment } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
import restaurantListState from "@/app/store/restaurantList";
import { ButtonComment, ButtonNextSearcHome, ButtonTagHome } from "@/app/components/common/buttonComponents/Button";
import searchConditionsState from "@/app/store/searchConditions";
import { useEffect, useState } from "react";
import { transaction } from "@/app/utils/axios";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import { useRouter } from "next/navigation";
const Main = () => {
  const router = useRouter();
  const restaurantListSet = restaurantListState();
  const searchConditionsSet = searchConditionsState();
  const [currnetPage, setCurrentPage] = useState<number>(1);
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  const [commentList, setCommentList] = useState<any>([])

  const [block, setBlock] = useState<string>(" hidden ")
  const [commentSearchScreenYn, setCommentSearchScreenYn] = useState(false);

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

  useEffect(() => {
      
      if(commentSearchScreenYn){
        setBlock(" block ");
        // setHashTagDivHiddenYn(" visible translate duration-300 h-[240px] ")
      }else{
        setBlock(" hidden ");
        // setHashTagDivHiddenYn(" invisible translate duration-300 h-[0px] ");
      }
  
    }, [commentSearchScreenYn]);

  function restaurantClickHandler(name:string){
    router.push('/' + name);
  }

  function commentOnClickHandler(){
    setCommentSearchScreenYn(!commentSearchScreenYn);
  }


  return(
    <div className="">  
      <div className="w-full">
        {
          restaurantListSet.restaurantList.map((data:any, index:any)=>{
            return (
              <div key={index + data.restaurantseq + Math.random()}>  
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
                          onClick={()=>restaurantClickHandler(data.restaurantname)} 
                          className="text-3xl font-bold break-words cursor-pointer hover:text-4xl ">
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
{/* 
                        <p className="border-b border-[#006341] my-1">
                          comment
                        </p> */}

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
                      <p className="me-1"><ButtonComment
                      onClick={()=>commentOnClickHandler()}
                      name={"comment"}/></p>
                      <p><ButtonComment name={"visit"}/></p>
                      
                    </div>
                    <div className={block + " border mx-2 mb-2  border-[#006341] rounded  "}>
                      <div className="rounded pt-1 px-1 ">
                        <textarea   
                        // ref={focusComment} 
                        // onChange={(e)=>blogCommentOnchangeHandler(e)}
                        // value={blogComment}
                        id="introduction"  className="
                        resize-none border w-full h-full px-2 py-1 text-sm 
                        focus:border-[#006341] text-[#006341] outline-none rounded"
                        />
                         <div className="flex justify-end pb-2 ">
                          <p><ButtonComment name={"save"}/></p>
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