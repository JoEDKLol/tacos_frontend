

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
    props.signInHandleModal(false);
  }

  function movePasswordPage(){
    props.signInHandleModal(false);
    props.passwordChangeHandleModal(true);
  }

  function moveSignUpPage(){
    props.signInHandleModal(false);
    props.signUpHandleModal(true);
  }

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className="static">
        <div className=' absolute top-0 right-0 left-0 z-10 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={block +  "  w-[300px] h-[400px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50 bg-white "}>
            <div className="flex justify-end h-[24px] bg-[#006341] ">
              <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
              onClick={()=>close()}
              >
                <FaRegWindowClose />
              </p>
            </div>
            <div className=" flex justify-center">
              <p className="text-2xl font-bold mt-2 text-[#006341]">Sign In</p> 
            </div>
            <div className="mt-4 p-2 text-[#006341]">
              {/* <label htmlFor="email" className="mb-2 text-m text-start text-[#006341]">Email*</label> */}
              <input placeholder="Email" type="text" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
            </div>

            <div className="p-2 text-[#006341]">
              {/* <label htmlFor="email" className="mb-2 text-m text-start text-[#006341]">Email*</label> */}
              <input placeholder="Password" type="password" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"></input>
            </div>

            <div className="pr-2 flex justify-end">
              <p className=" text-sm cursor-pointer font-bold text-[#006341] hover:text-base "
              onClick={()=>movePasswordPage()}
              >
              Forget password?
              </p>
            </div>

            <div className="mt-6 p-2 flex justify-center w-[100%]">
              <p className=" w-[100%]">
                <button className="border border-[#006341] w-[100%] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 px-4 rounded">
                  Sign In
                </button>
              </p>
            </div>

            <div className=" flex justify-center w-[100%]">
              <p className=" text-sm leading-relaxed text-[#006341]">Not registered yet? 
              {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700">Create an Account</button> */}
              </p>
              <p className=" text-sm leading-relaxed text-[#006341] font-bold cursor-pointer hover:text-base"
              onClick={()=>moveSignUpPage()}
              >Create an Account
              {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700"></button> */}
              </p>
            </div>

            <div className=" py-2 mt-2 inline-flex items-center justify-center w-full mb-3 ">
              <hr className="w-full mx-2 h-px border-1 border-[#006341] "/>
              <span className="absolute px-3 font-medium text-[#006341] -translate-x-1/2 bg-white left-1/2">or</span>
            </div>

            <div className="p-2 flex justify-center w-[100%]">
              <p className=" w-[100%]">
                <button className="flex justify-center border border-[#006341] w-[100%] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 px-4 rounded">
                <span className="mr-1 p-1"><FcGoogle/></span> Sign in with Google
                </button>
              </p>
            </div>


          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default SignIn;



