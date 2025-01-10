
import { TbThumbUp } from "react-icons/tb";
import { TbThumbUpFilled } from "react-icons/tb";
import { MdOutlineComment } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
const Main = () => {

  
    return(
      <div className="">  
        <div className="w-full">

          <div className="flex justify-center mt-5 w-[100%]">
            <div className="flex flex-col w-[80%]">
              <div className="mt-5 flex justify-normal border-2 border-[#006341]  rounded hover:shadow-lg hover:shadow-green-900/50  ">
                <div className="hidden
                2xl:block xl:block lg:block md:block sm:hidden
                ">
                  <p className="w-[200px] h-[250px] relative">
                    <Image
                    src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
                    alt=""
                    quality={30} // 이미지 품질, 기본값 75
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    />
                  </p>
                </div>
                
                <div className="flex flex-col p-4 w-full ">

                <div className="flex justify-center rounded mb-2
                2xl:hidden xl:hidden lg:hidden md:hidden sm:flex
                ">
                  <p className="w-[200px] h-[200px] relative">
                    <Image
                    src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
                    alt=""
                    quality={30} // 이미지 품질, 기본값 75
                    layout="fill"
                    style={{ objectFit: "cover" , borderRadius: '12px'}}
                    />
                  </p>
                </div>


                  <p className="text-4xl font-bold">Taco Oaxaca</p>
                  <p className="flex justify-normal mt-2 ms-2">
                    <span className=" text-lg"><TbThumbUpFilled/></span>
                    <span className="ms-1 text-sm">10</span>
                    <span className="ms-3 text-lg"><MdOutlineComment/></span>
                    <span className="ms-1 text-sm">10</span>
                    <span className="ms-3 text-lg hidden
                    2xl:block xl:block lg:block md:block sm:hidden
                    "><GoLocation/></span>
                    <span className="ms-1 text-sm hidden
                    2xl:block xl:block lg:block md:block sm:hidden
                    ">4715 Foothill Blvd, Oakland, CA 94601</span>
                  </p>
                  <p className="flex justify-normal mt-2
                  2xl:hidden xl:hidden lg:hidden md:hidden sm:flex
                  ">
                    <span className="text-lg "><GoLocation/></span>
                    <span className="ms-1 text-sm ">4715 Foothill Blvd, Oakland, CA 94601</span>
                  </p>

                  <p className="flex flex-col mt-2 w-full ">
                    
                    <span className="text-sm font-bold ">Review - Daehee Kim</span>
                    <span className=" text-sm h-[62px] break-words line-clamp-3 ">4715 Foothill Blvd, Oakland, CA 94601
                    CA 946014715 Foothill Blvd, Oakland, CA 946014715 Foothill Blvd, Oakland, CA 946014715 Foothill Blvd, Oakland, CA 94601

                    </span>

                  </p>

                  <p className="flex justify-normal mt-4 ">
                    <span className="text-base border px-4 py-1 rounded-full font-bold border-[#006341] text-[#006341] me-4">tacos</span>
                    <span className="text-base border px-4 py-1 rounded-full font-bold border-[#006341] text-[#006341] me-4">tacos</span>
                    <span className="text-base border px-4 py-1 rounded-full font-bold border-[#006341] text-[#006341] me-4">tacos</span>
                  </p>

                </div>
              </div>

             



            </div>
            
            
          
          </div>
        </div>
      </div>
    );
  };
  
  export default Main