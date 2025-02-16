
'use client';

import errorScreenShow from "@/app/store/errorScreen";
// import { FcGoogle } from "react-icons/fc";
import { FaRegWindowClose } from "react-icons/fa";
const ErrorScreen = () => {
  
  const screenShow = errorScreenShow();

  function close(){
    screenShow.screenShowFalse();
  }
  
  return (

    (screenShow.screenShow)?(
      <div className="">
        <div className=' fixed top-0 right-0 left-0 z-50 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={ "  w-[300px] h-[170px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 bg-white "}>
            <div className="flex justify-end h-[16%] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose />
              </p>
            </div>
            <div className=" mx-2 my-2 h-[45%] ">
              <p className="break-words w-[100%] font-bold text-[#006341] ">
              ERROR 
              </p>
              <p className="break-words w-[100%]  text-[#006341] ">
              {screenShow.message} 
              </p>
            </div>
            <div className="flex justify-end mx-2 mb-2 h-[20%] ">
              <button className="border-2 border-[#006341] py-1 px-2 mr-2 rounded font-bold text-[#006341] 
              hover:bg-[#006341] hover:text-white"
              onClick={()=>close()}
              >CLOSE</button>
            </div>
          </div>
          
        </div>
      </div>  
    ):""
  );
}

export default ErrorScreen;



