'use client';
import Image from "next/image";
import image1 from "../../public/landingImgs/_36d446e2-cd81-46e7-810e-38de6556f484.jpg"


import { useEffect, useState } from "react";

export default function Page() {

  const [images, setImages] = useState<any>([]);
  

  useEffect(()=>{
    let arrImages = [];
    arrImages.push("/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg");
    arrImages.push("/landingImgs/_36d446e2-cd81-46e7-810e-38de6556f484.jpg");
    arrImages.push("/landingImgs/_77107536-e204-4bfc-9ef2-4e35057cfd14.jpg");
    arrImages.push("/landingImgs/_a3f7f0c8-832f-459c-a0de-373f90e63e0b.jpg");
    // arrImages.push("/landingImgs/_a1890a70-a0af-4d47-b870-56857623a8fc.jpg");
    // arrImages.push("/landingImgs/_b305d995-095a-4011-a99a-6dd7545a6514.jpg");
    // arrImages.push("/landingImgs/_e98f4a99-4b3c-462a-969c-8dd7d36fdbf8.jpg");
    // arrImages.push("/landingImgs/_fef648fd-a351-4e55-a190-dedbaa6813b9.jpg");
    
    arrImages.map((i, value) => console.log(i));
    
    setImages(arrImages);

    
    

  },[])


  return(
    <div className="h-screen ">
      <div className="h-[100%]  flex justify-center ">
        <div className="flex justify-center items-center w-[98%]  ">
            {
              (images.length > 0)?
              
              images.map((value:any, index:any)=>{
                return (
                <p key={index + value} className="h-96 w-96 relative">
                  <Image
                  src={value}
                  alt=""
                  quality={30} // 이미지 품질, 기본값 75
                  layout="fill"
                  style={{ objectFit: "cover" }}
                  />
                </p>)
              }):""
            }

        </div>
      </div>
    </div >
  )
 
 }
