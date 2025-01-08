

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const PasswordChange = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  
  useEffect(() => {
    
    if(props.show){
      setBlock("visible transform translate-y-8 ease-out duration-700 ");
    }else{
      setBlock("invisible  ");
    }

  }, [props.show]);

  function close(){
    props.passwordChangeHandleModal(false);
  }

  function moveSignInPage(){
    props.passwordChangeHandleModal(false);
    props.signInHandleModal(true);
  }




  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className="static">
        <div className=' absolute top-0 right-0 left-0 z-50 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={block +  "  w-[300px] h-[400px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 "}>
            <div className="flex justify-end h-[24px] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose />
              </p>
            </div>
            <div className=" flex justify-center">
              <p className="text-2xl font-bold mt-2 text-[#006341]">Password Change</p> 
            </div>
            <div className="mt-4 p-2 text-[#006341]">
              <p className="flex justify-between">
                <input placeholder="Email" type="text" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
                <button className="ms-1 border border-[#006341] w-[90px] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded">
                  Send
                </button>
              </p>
              
              
            </div>

            <div className="relative p-2 text-[#006341] ">
              <p className="flex justify-between">
                <input placeholder="Number" type="text" className=" relative w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
                <button className="ms-1 border border-[#006341] w-[90px] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded">
                Verify
                </button>
              </p>
              <p className="absolute top-4 left-44 text-sm text-red-500">00:00</p>
            </div>

            <div className="p-2 text-[#006341]">
              <p className="flex justify-between">
                <input placeholder="Password"  type="password" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
              </p>
            </div>

            <div className="p-2 text-[#006341]">
              <p className="flex justify-between">
                <input placeholder="Repassword"  type="password" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
              </p>
            </div>

            <div className="mt-6 p-2 flex justify-center w-[100%]">
              <p className=" w-[100%]">
                <button className="border border-[#006341] w-[100%] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 px-4 rounded">
                  Change Password
                </button>
              </p>
            </div>

            <div className=" flex justify-center w-[100%]">
              <p className=" text-sm leading-relaxed text-[#006341]">Already have an account?
              {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700">Create an Account</button> */}
              </p>
              <p className=" text-sm leading-relaxed text-[#006341] font-bold cursor-pointer hover:text-base"
              onClick={()=>moveSignInPage()}
              >SignIn
              {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700"></button> */}
              </p>
            </div>


          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default PasswordChange;



