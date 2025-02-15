

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

  function close(res:boolean){
    props.setConfirm(false);
    props.setConfirmRes(res, props.fName, props.params);
    
  }

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className=" ">
        <div className=' fixed top-0 right-0 left-0 z-50 w-[100vw] h-[100vh] border flex justify-center items-center'>
          <div className={block +  "  w-[300px] h-[200px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 bg-white "}>
            <div className="flex justify-end h-[12%] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close(false)}
              >
                <FaRegWindowClose />
              </p>
            </div>
            <div className=" mx-2 my-2 h-[57%] ">
              <p className="break-words w-[100%] font-bold text-[#006341] ">
              {"Do you want to "+ props.message + "?"}
              </p>
            </div>
            <div className="flex justify-end mx-2 mb-2 h-[19%] ">
              <button className="border-2 border-[#006341] py-1 px-2 mr-2 rounded font-bold text-[#006341] 
              hover:bg-[#006341] hover:text-white"
              onClick={()=>close(true)}
              >YES</button>
              <button className="border-2 border-[#006341] py-1 px-2  rounded font-bold text-[#006341]
              hover:bg-[#006341] hover:text-white"
              onClick={()=>close(false)}
              >NO</button>
            </div>
          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default CustomConfirm;



