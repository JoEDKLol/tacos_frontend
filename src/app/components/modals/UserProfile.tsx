

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";
import Image from "next/image";

const UserProfile = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  console.log(props.userInfo);
  useEffect(() => {
    
    if(props.show){
      setBlock("visible transform translate-y-8 ease-out duration-700 ");
    }else{
      setBlock("invisible  ");
    }

  }, [props.show]);

  function close(){
    props.userProfileModal(false);
    
  }

  

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className=" ">
        <div className=' fixed top-0 right-0 left-0 z-50 w-full h-[100vh] border flex justify-center items-center'>
          <div className={block +  "  w-[350px] h-[330px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 bg-white "}>
            <div className="flex justify-end h-[24px] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose/>
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <div className='ring-1 w-[200px] h-[200px] ring-[#006341] rounded relative ' >
                {
                  (props.userInfo.userimg)?
                  <Image
                  src={props.userInfo.userimg}
                  quality={30}
                  layout="fill"
                  style={{ objectFit: "cover" , borderRadius: '5px' }}
                  alt='' />
                  :""
                }
              </div> 
            </div>
          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default UserProfile;



