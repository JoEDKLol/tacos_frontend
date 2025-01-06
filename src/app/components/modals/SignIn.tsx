

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";

const SignIn = (props:any) => {
  
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
          <div className={block +  "  w-[350px] h-[400px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 "}>
            



          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default SignIn;



