
'use client';

import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import { transaction } from "@/app/utils/axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface categoryList {
  _id:string
  userseq : number
  restaurantseq : number
  name : string
  order : number
  selected : string
}

interface categoriesList extends Array<categoryList>{}

interface menuList {
  _id:string
  userseq : number
  restaurantseq : number
  categoryid : string
  img : string
  thumbImg : string
  name : string
  description : string
  price : string
  selected : string
}

interface menusList extends Array<menuList>{}


const Main = (props:any) => {
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const [categories, setCategories] = useState<categoriesList>([]);
  const [menus, setMenus] = useState<menusList>([]);

  const layout = props.menuLayout;
  const restaurantName = decodeURIComponent(path.split("/")[1]);

  useEffect(()=>{
    categorySearch();
    menuSearch();
    
  },[]);

  async function categorySearch(){
    const obj = {
      restaurantname : restaurantName, 
    }

    const retObj = await transaction("get", "res/categorysearch", obj, "", false, true, screenShow, errorShow);
    // console.log(retObj);
    if(retObj.sendObj.success === "y"){
      // console.log(retObj.sendObj.resObj);
      if(retObj.sendObj.resObj.length > 0){
        setCategories(retObj.sendObj.resObj);
      
      } 
    }
  }

  async function menuSearch(){
    const obj = {
      restaurantname : restaurantName, 
    }

    const retObj = await transaction("get", "res/menusearch", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success === "y"){
      // console.log(retObj.sendObj.resObj);
      setMenus(retObj.sendObj.resObj)
    }
  }

  async function changeCategoryMenu(e:any) {
    
    const obj = {
      restaurantname : restaurantName, 
      categoryid : e.target.value
    }

    const retObj = await transaction("get", "res/menusearch", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success === "y"){
      setMenus(retObj.sendObj.resObj)
    }
  }

  
  return(
    <div className="">  
      <div className={" h-[100%] border p-1" } style={{backgroundColor:layout.bgColor}}>

        <div className="flex justify-center  ">
          <div className=""
            style={{
              marginTop:layout.categoryMarginTop+"px"
            }}
          >
            <select
            onChange={(e)=>changeCategoryMenu(e)}
            className="w-full bg-transparent placeholder:text-slate-400 
            pl-3 pr-8 py-2 transition duration-300 ease 
            focus:outline-none appearance-none cursor-pointer"
            style={{
              backgroundColor:layout.cabgColor, 
              color:layout.caTextColor,
              borderColor:layout.caBorderColor,
              height:layout.categoryBoxHeight + "px",
              width:layout.categoryBoxWidth  + "px",
              fontSize:layout.categoryTextSize + "px",
              borderWidth:layout.categoryBorderSize + "px",
              borderRadius:layout.categoryBorderRadius + "px"
            }}
            >
            <option value="">Choose a Category</option>
            {
              categories.map((data, index)=>{
                return(
                  <option key={data._id + index} value={data._id}>{data.name}</option>
                )
              })
            }
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-center
        2xl:flex  xl:flex  lg:flex  md:flex  sm:grid
        2xl:flex-wrap  xl:flex-wrap  lg:flex-wrap  md:flex-wrap  sm:grid-cols-1  "
        style={{
          marginTop:layout.menuBoxMarginTop+"px",
          marginLeft:layout.menuBoxMarginLeft+"px",
          marginRight:layout.menuBoxMarginLeft+"px",
        }}
        >
          
          {
            menus.map((data, index)=>{
              return(
                <div key={data._id+index} >
                  <div className="m-5" 
                    style={{
                    width:layout.menuBoxWidth + "px", 
                    height:layout.menuBoxHeight + "px", 
                    borderWidth:layout.menuBoxBorderSize + "px",
                    backgroundColor:layout.menuBgColor,
                    borderColor:layout.menuBorderColor, 
                    borderRadius:layout.menuBoxRadius + "px"
                  }}>

                    
                    
                    <div className="w-full flex justify-center">
                      <div className=' rounded relative '
                        style={{
                          width:layout.imgBoxWidth+"px", 
                          height:layout.imgBoxHeight+"px", 
                          borderWidth:layout.imgBorderSize + "px", 
                          borderColor:layout.menuImgBdBdColor, 
                          borderRadius:layout.imgBoxRadius + "px", 
                          marginTop:layout.imgBoxMarginTop+"px",
                        }}
                          
                      >
                        {data.img ? (
                          
                              <Image 
                              src={data.img}
                              quality={30}
                              layout="fill"
                              style={{ objectFit: "cover" , borderRadius:layout.imgBoxRadius + "px",  }}
                              alt='' />
                          ) : ""
                        }
                      </div>
                    </div> 

                    <div className="w-full " >
                      <p className="flex justify-center " 
                      style={{
                        color:layout.menuNameColor, 
                        fontSize:layout.menuNameTextSize + "px",
                        fontWeight:layout.menuNameFontWeight,
                        marginTop:layout.menuNameMarginTop + "px",
                        }}>
                        {data.name}
                      </p>
                      <p className="flex justify-center " 
                      style={{
                        color:layout.menuPriceColor,
                        fontSize:layout.menuPriceTextSize + "px",
                        fontWeight:layout.menuPriceFontWeight,
                        marginTop:layout.menuPriceMarginTop + "px",
                        }}>
                        {data.price}
                      </p>
                    </div>

                    <div className=""
                    style={{
                      marginTop:layout.menuDesMarginTop + "px"
                    }}
                    >
                      <p className="mt-1 flex justify-center" >
                        <textarea 
                        value={data.description}
                        disabled={true}
                        style={{
                          color:layout.menuDesColor, backgroundColor:layout.menuDesBgColor, borderColor:layout.menuDesBdColor,
                          fontSize:layout.menuDesTextSize + "px",
                          fontWeight:layout.menuDesFontWeight,
                          height:layout.menuDesBoxHeight + "px",
                          width:layout.menuDesBoxWidth + "px", 
                          borderWidth:layout.menuDesBoxBorderSize + "px", 
                          borderRadius:layout.menuDesBoxRadius + "px", 

                        }}
                        className="resize-none  px-2 py-1 outline-none "
                        ></textarea>
                      </p>
                    </div>

                  </div>
                </div>
              )
            })
          }


        </div>
      </div>
    
    </div>  
  );
};

export default Main