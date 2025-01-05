

import { useEffect, useState } from "react";
import Portal from "./Portal";

const CustomConfirm = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  
  useEffect(() => {
    
    if(props.show){
      setBlock("visible transform translate-x-28 ease-out duration-700 ");
    }else{
      setBlock("invisible transform translate-x-0 ease-out duration-700 ");
    }

  }, [props.show]);

  function close(){
    props.setConfirm(true);
    props.handleModal();
  }

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className="static">
        <div className=' absolute top-0 right-0 left-0 z-50 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={block +  "  w-[200px] h-[200px]"}>
            <button
            onClick={()=>close()}
            >
            close
            </button>
          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default CustomConfirm;



