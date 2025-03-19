'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import './imageCSS.scss';
import { useRouter } from "next/navigation";

const LangdingPage = () => {

  const [images, setImages] = useState<any>([]);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [currentImgText, setCurrentImgText] = useState<string>("");
  // const [transformText, setTransformText] = useState<string>(" visible transform translate-x-8 ease-out duration-700 "); 
  const router = useRouter();

  useEffect(()=>{
    const arrImages = [];

    const img1 = {
      index : 0,
      url : "/landingImgs/restaurant.PNG"
    }

    const img2 = {
      index : 1,
      url : "/landingImgs/header.PNG"
    }

    const img3 = {
      index : 2,
      url : "/landingImgs/about.PNG"
    }

    const img4 = {
      index : 3,
      url : "/landingImgs/menu.PNG"
    }



    arrImages.push(img1);
    arrImages.push(img2);
    arrImages.push(img3);
    arrImages.push(img4);
    


    // arrImages.map((i) => console.log(i));
    setImages(arrImages);
  },[]);

  useEffect(()=>{
    if(currentImg===0) setCurrentImgText("Restaurant registration"); 
    if(currentImg===1) setCurrentImgText("Decorate Home of your restaurant");
    if(currentImg===2) setCurrentImgText("Enter your restaurant location");
    if(currentImg===3) setCurrentImgText("Enter your restaurant menus");
    
  },[currentImg])

 
  function imgBtnOnClick(type:string){  
    if(type === "next"){
      if(currentImg + 1 === images.length){
        setCurrentImg(0);
      }else{
        setCurrentImg(currentImg + 1);
      }
      
    }else{
      if(currentImg - 1 < 0){
        setCurrentImg(images.length - 1);
      }else{
        setCurrentImg(currentImg - 1);
      }
    }



  }

  function goHomeClickHandler(){
    router.push('/home');
  }
 
  return(<>  
    <div className="">
      <div className="flex justify-center items-center  h-[100vh]  ">
        <div className="w-[80vw] h-[300px] text-center border-2 border-[#006341] p-5 rounded-lg
        2xl:w-[400px]  xl:w-[400px]  lg:w-[400px]  md:w-[400px] sm:w-[80vw]
        2xl:h-[400px]  xl:h-[400px]  lg:h-[400px]  md:h-[400px] sm:h-[300px]
        ">
          <p className="text-3xl font-bold h-[50px] text-[#006341] ">
            Start your Restaurant
          </p>
          <p className="text-lg mt-5 h-[50px] text-[#006341] ">
            {` Decorate your own restaurant. It's simple. `}
          </p>

          <p className="flex flex-1 h-[200px] items-center justify-center
          2xl:h-[280px]  xl:h-[280px]  lg:h-[280px]  md:h-[280px] sm:h-[200px]
          ">
            <button className="border border-[#006341] text-lg w-[120px] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 px-4 rounded-full"
            onClick={()=>goHomeClickHandler()}
            >
            Explore
            </button>
          </p>


        </div>
        
        <div className=" mx-5 hidden h-[300px]
        2xl:block  xl:block  lg:block  md:block  sm:hidden 
        2xl:w-[400px]  xl:w-[400px]  lg:w-[400px]  md:w-[400px]
        2xl:h-[400px]  xl:h-[400px]  lg:h-[400px]  md:h-[400px]
        
        ">
        
          <div className=" relative w-full h-full ">

            <div className="relative w-[400px] h-[400px] overflow-hidden" >
            {
            (images.length > 0)?
            
            images.map((value:any, index:any)=>{
              return (
              
              (value.index === currentImg)?
              
              
                <div key={index + value} className= { " fade-in-box w-[400px] h-[400px] absolute z-0 "}>
                  <Image
                  src={value.url}
                  alt=""
                  quality={30} // 이미지 품질, 기본값 75
                  layout="fill"
                  // width={200}
                  // height={200}
                  style={{ objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
              : ""

                // <div key={index + value} className= { " fade-in-box w-[500px] h-[500px]  "}>
                //   <Image
                //   src={value.url}
                //   alt=""
                //   quality={30} // 이미지 품질, 기본값 75
                //   layout="fill"
                //   style={{ objectFit: "cover"  }}
                //   />
                // </div>
            )
            }):""
          }

                <div className="h-[400px] w-[400px] absolute z-10 flex justify-between items-center">
                  <button className="bg-slate-500 text-2xl ps-1 pe-2 py-2 ms-1 rounded-lg opacity-50 text-white hover:opacity-80"
                  onClick={()=>imgBtnOnClick("prev")}
                  ><IoIosArrowBack/></button>
                  <button className="bg-slate-500 text-2xl ps-1 pe-2 py-2 me-1 rounded-lg opacity-50 text-white hover:opacity-80"
                  onClick={()=>imgBtnOnClick("next")}
                  ><IoIosArrowForward/></button>
                </div>

                <div className="h-[90px] w-[400px] absolute z-10 flex justify-center items-start pt-20">
                  <div className=" flex justify-center items-center rounded-md bg-yellow-50 w-[350px] h-[60px] border-2 border-[#006341] p-2
                  text-[#006341] text-lg
                  ">
                  {currentImgText}
                  </div>
                </div>

            </div>
          </div>
      


          


        </div>

      </div>
    </div>
  </>
  );
};

export default LangdingPage