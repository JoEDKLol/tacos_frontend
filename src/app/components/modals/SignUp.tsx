import { useRef, useEffect, useState } from "react";
import Portal from "./Portal";
import { FaRegWindowClose } from "react-icons/fa";
import { transaction } from "@/app/utils/axios";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import { checkEmail, checkPassword } from "@/app/utils/checkUserValidation";

const SignUp = (props:any) => {
  
  const [block, setBlock] = useState<string>("block")
  const [verifyEmail, setVerifyEmail] = useState<string>("")
  const [verifyNumber, setVerifyNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")

  const [emailObjDisable, setEmailObjDisable] = useState<any>({objDisable:false, classHover:" hover:bg-[#006341] hover:text-white bg-white "});
  const [numberObjDisable, setNumberObjDisable] = useState<any>({objDisable:true, classHover:"bg-gray-100"});
  const [passwordDisable, setPasswordDisable] = useState<boolean>(true);
  const [rePasswordDisable, setRePasswordDisable] = useState<boolean>(true);
  const [signUpObjDisable, setSignUpObjDisable] = useState<any>({objDisable:true, classHover:"bg-gray-100"});
  
  const [signUpSeccess, setSignUpSeccess] = useState<boolean>(false);

  const [validationMsg, setValidationMsg] = useState<string>("");

  //timer
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<string>();

  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  const focusEmail = useRef<HTMLInputElement>(null);
  const focusNumber = useRef<HTMLInputElement>(null);
  const focusPassword = useRef<HTMLInputElement>(null);
  const focusRepassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initF();
    if(props.show){  
      setBlock("visible transform translate-y-8 ease-out duration-700 ");
    }else{
      setBlock("invisible  ");
    }

  }, [props.show]);

  useEffect(()=>{
    let interval:any;
    if(isRunning === true){
      
      let startTime = 180;
      interval = setInterval(() => {
        setTimer(timerMS(startTime)); 
        startTime = startTime-1;
        if(startTime < 0){
            clearInterval(interval);
            setTimer(""); 
            initF();

        }
      }, 1000); 

    }else{
      clearInterval(interval);
      setTimer("");
    }

    return () => {
      clearInterval(interval);
    };

  },[isRunning]);

  useEffect(() => {
    if(numberObjDisable.objDisable === false){
      focusNumber.current?.focus();
    }
  }, [numberObjDisable.objDisable]);

  useEffect(() => {
    if(passwordDisable === false){
      focusPassword.current?.focus();
    }
  }, [passwordDisable]);

  
  useEffect(()=>{
    let totalByte = 0;
    if(verifyNumber !== undefined){
      let inputValue = "";
      for(let i =0; i < verifyNumber.length; i++) {
        const currentByte = verifyNumber.charCodeAt(i);
        //48~57 0~9
        if(currentByte >= 48 && currentByte <= 57){
          inputValue += verifyNumber.charAt(i);
        }
        totalByte++;
        if(totalByte > 5){
          break;
        }
      }
      setVerifyNumber(inputValue);
    }
    
  },[verifyNumber]);
  

  function initF(){ 
    setIsRunning(false);
    setVerifyNumber(""); 
    setEmailObjDisable({objDisable:false, classHover:" hover:bg-[#006341] hover:text-white bg-white "});
    setNumberObjDisable({objDisable:true, classHover:" bg-gray-100 "});
    setPasswordDisable(true);
    setRePasswordDisable(true);

    setSignUpObjDisable({objDisable:true, classHover:" bg-gray-100 "})
    setSignUpSeccess(false);
    
  } 

  function timerMS(seconds:number){
    const mins = Math.floor((seconds)/60);
    const secs = seconds - mins*60;
    return addZero(mins) + ':' + addZero(secs);

    function addZero(num:number) {
        return ((num < 10) ? '0' : '') + num
    } 
  }
  
  
  function close(){
    props.signUpHandleModal(false);
  }

  function moveSignInPage(){
    props.signUpHandleModal(false);
    props.signInHandleModal(true);
  }
  
  function emailOnChangeHandler(e:any){
    setVerifyEmail(e.target.value);
  }

  async function sendEmail(){
    setValidationMsg("");

    const checkObj = {
      email:verifyEmail,
    }

    const retObj = checkEmail(checkObj);
    
    if(!retObj.yn){
      focusEmail.current?.focus();
      setValidationMsg(retObj.str);
      return;
    }
    
    const obj = {
      email : verifyEmail
    }
    const resObj = await transaction("post", "sendemail", obj, "", false, true, screenShow, errorShow);
    console.log(resObj);
    if(resObj.sendObj.success==="y"){
      setIsRunning(true);
      setEmailObjDisable({objDisable:true, classHover:" bg-gray-100 "})
      setNumberObjDisable({objDisable:false, classHover:" hover:bg-[#006341] hover:text-white bg-white "});
      
    }else{
      if(resObj.sendObj.code === "1011"){
        setValidationMsg(resObj.sendObj.message);
      }

      if(resObj.sendObj.code === "1014"){
        setValidationMsg(resObj.sendObj.message);
      }

      setIsRunning(false);
    }
  }

  function verifyNumberOnChangeHandler(e:any){
    setVerifyNumber(e.target.value);    
  }

  async function verifyNumberCheck(){
    setValidationMsg("");
    const obj = {
      email : verifyEmail,
      verifynumber : verifyNumber
    }
    const resObj = await transaction("get", "checkverifynumber", obj, "", false, true, screenShow, errorShow);
    
    if(resObj.sendObj.success==="y"){
      setNumberObjDisable({objDisable:true, classHover:"bg-gray-100"});
      setIsRunning(false);
      setPasswordDisable(false);
      setRePasswordDisable(false);
      setSignUpObjDisable({objDisable:false, classHover:" hover:bg-[#006341] hover:text-white bg-white "});
    }else{
      setValidationMsg(resObj.sendObj.message);
    }

   
  }

  function passwordOnChangeHandler(e:any){
    setPassword(e.target.value);
  }

  function rePasswordOnChangeHandler(e:any){
    setRePassword(e.target.value)
  }

  async function signUp(){
    setValidationMsg("");
    const checkObj = {
      password:password,
      rePassword:rePassword
    }

    const retObj = checkPassword(checkObj);
    
    if(!retObj.yn){
      // focusEmail.current?.focus();
      if(retObj.field === "rePassword"){
        focusRepassword.current?.focus();
      }else{
        focusPassword.current?.focus();
      }
      
      setValidationMsg(retObj.str);
      return;
    }else{
      const obj = {
        email : verifyEmail,
        password : password
      }
      const resObj = await transaction("post", "signup", obj, "", false, true, screenShow, errorShow);

      if(resObj.sendObj.success==="y"){
        // console.log("회원가입 성공");
        setSignUpSeccess(true);

      }else{
        // console.log("회원가입 실패");
        setValidationMsg(resObj.sendObj.message);
      }


    }




  }

  return (
    <Portal
      selector="portal"
      show={props.show}>
      <div className="static">
        <div className=' fixed top-0 right-0 left-0 z-10 w-[100%] h-[100%] border flex justify-center items-center'>
          <div className={block +  "  w-[300px] h-[400px] border-2 rounded-md border-[#006341] shadow-lg shadow-green-900/50  bg-white"}>
            
            {(!signUpSeccess)?<>
              <div className="flex justify-end h-[24px] bg-[#006341] ">
                <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
                onClick={()=>close()}
                >
                  <FaRegWindowClose />
                </p>
              </div>
              <div className=" flex justify-center">
                <p className="text-2xl font-bold mt-2 text-[#006341]">Sign Up</p> 
              </div>
              <div className="mt-4 p-2 text-[#006341]"> 
                <p className="flex justify-between">
                  <input placeholder="Email" type="text" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"
                  ref={focusEmail}
                  onChange={(e)=>emailOnChangeHandler(e)}
                  disabled={emailObjDisable.objDisable}
                  ></input>
                  <button className={emailObjDisable.classHover + " ms-1 border border-[#006341] w-[90px] text-[#006341] font-bold py-1 rounded"}
                  disabled={emailObjDisable.objDisable}
                  onClick={()=>sendEmail()} 
                  >
                    Send
                  </button>
                </p>
                
                
              </div>

              <div className="relative p-2 text-[#006341] ">
                <p className="flex justify-between">
                  <input placeholder="Number" type="text" className=" relative w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded" 
                  ref={focusNumber}
                  disabled={numberObjDisable.objDisable}
                  value={verifyNumber}
                  onChange={(e)=>verifyNumberOnChangeHandler(e)}
                  ></input>
                  <button 
                  disabled={numberObjDisable.objDisable}
                  className={numberObjDisable.classHover + " ms-1 border border-[#006341] w-[90px] text-[#006341] font-bold py-1 rounded"}
                  onClick={()=>verifyNumberCheck()}
                  >
                  Verify
                  </button>
                </p>
                <p className="absolute top-4 left-44 text-sm text-red-500">{timer}</p>
              </div>

              <div className="p-2 text-[#006341]">
                <p className="flex justify-between">
                  <input placeholder="Password"  type="password" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"
                  onChange={(e)=>passwordOnChangeHandler(e)}
                  disabled={passwordDisable}
                  ref={focusPassword}
                  ></input>
                </p>
              </div>

              <div className="p-2 text-[#006341]">
                <p className="flex justify-between">
                  <input placeholder="Repassword"  type="password" className="w-[100%] h-[10px] border border-[#006341] outline-none py-4 px-3 rounded"
                  onChange={(e)=>rePasswordOnChangeHandler(e)}
                  disabled={rePasswordDisable} 
                  ref={focusRepassword}
                  ></input>
                </p>
              </div>
              <div className="h-[20px] px-2">
                <p className="flex justify-center text-red-500 text-xs">{validationMsg}</p>
              </div>
              <div className="mt-3 p-2 flex justify-center w-[100%]">
                <p className=" w-[100%]">
                  <button className={signUpObjDisable.classHover + " border border-[#006341] w-[100%]  text-[#006341] font-bold py-1 px-4 rounded"}
                  disabled={signUpObjDisable.objDisable}
                  onClick={()=>signUp()}
                  >
                  Sign Up
                  </button>
                </p>
              </div>

              <div className=" flex justify-center w-[100%]">
                <p className=" text-sm leading-relaxed text-[#006341]">Already have an account?
                {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700">Create an Account</button> */}
                </p>
                <p className=" text-sm leading-relaxed text-[#006341] font-bold cursor-pointer hover:text-base"
                onClick={()=>moveSignInPage()}
                >Sign In
                {/* <button onClick={()=>{clickSignUpModal()}} className="font-bold text-grey-700"></button> */}
                </p>
              </div>
            </>
            :<>
              <div className="flex justify-end h-[24px] bg-[#006341] ">
                <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
                onClick={()=>close()}
                >
                  <FaRegWindowClose />
                </p>
              </div>
              <div className=" flex justify-center">
                <p className="text-2xl font-bold mt-2 text-[#006341]">Sign Up Success</p> 
              </div>

              <div className=" flex justify-center mt-48">
                <button 
                  className={" hover:bg-[#006341] hover:text-white ms-1 border border-[#006341] w-[60%] bg-white text-[#006341] font-bold py-1 rounded"}
                  onClick={()=>moveSignInPage()}
                  >
                  Go to Sign in page
                </button>

              </div>
            </>}

            

            

          </div>
          
        </div>
      </div>  
       
    </Portal>
  );
}

export default SignUp;



