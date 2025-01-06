

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";

const CustomConfirm = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  
  useEffect(() => {
    
    if(props.show){
      setBlock("visible transform translate-y-8 ease-out duration-700 ");
    }else{
      setBlock("invisible  ");
    }

  }, [props.show]);

  function close(){
    props.setConfirm(false);
    props.handleModal();
  }

  function closeYes(){
    props.setConfirm(false);
    props.handleModal();
  }

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className="static">
        <div className=' absolute top-0 right-0 left-0 z-50 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={block +  "  w-[300px] h-[200px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 "}>
            <div className="flex justify-end h-[12%] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose />
              </p>
            </div>
            <div className=" mx-2 my-2 h-[57%] ">
              <p className="break-words w-[100%] font-bold text-[#006341] ">
              {props.message}
              </p>
            </div>
            <div className="flex justify-end mx-2 mb-2 h-[19%] ">
              <button className="border-2 border-[#006341] py-1 px-2 mr-2 rounded font-bold text-[#006341] 
              hover:bg-[#006341] hover:text-white"
              onClick={()=>close()}
              >YES</button>
              <button className="border-2 border-[#006341] py-1 px-2  rounded font-bold text-[#006341]
              hover:bg-[#006341] hover:text-white"
              onClick={()=>close()}
              >NO</button>
            </div>
          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default CustomConfirm;



