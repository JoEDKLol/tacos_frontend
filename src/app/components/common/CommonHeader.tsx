'use client';
import SignIn from "@/app/components/modals/SignIn";
import PasswordChange from "@/app/components/modals/PasswordChange";
import SignUp from "@/app/components/modals/SignUp";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transaction } from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommonHearder = () => {

  const [showSigninPortal, setShowSigninPortal] = useState(false);
  const [showPasswordChangePortal, setShowPasswordChangePortal] = useState(false);
  const [showSignUpPortal, setShowSignUpPortal] = useState(false);
  const [signinYn, setSigninYn] = useState(false);
  const userStateSet = userState();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const router = useRouter();

  useEffect(()=>{
    if(userStateSet.id){
      setSigninYn(true);
    }else{
      setSigninYn(false);
    }
  },[userStateSet]);

  const signInHandleModal = (showYn:boolean) => {
    setShowSigninPortal(showYn);
  };

  const passwordChangeHandleModal = (showYn:boolean) => {
    setShowPasswordChangePortal(showYn);
  };

  const signUpHandleModal = (showYn:boolean) => {
    setShowSignUpPortal(showYn);
  };

  async function logoutOnclickHandler(){
    signOut();
    sessionStorage.removeItem("tacos-accesstoken");
    const retObj = await transaction("get", "logout", {}, "", false, true, screenShow, errorShow);
    console.log(retObj);
  }

  function movetoMyInfoOnclickHandler(){
    router.push("/management")
  }

  function movetoHomeOnclickHandler(){
    router.push("/home")
  }


  return(
    <>

    {
      (signinYn)?
      <div className={`w-full mt-1 border-b-2 border-white flex justify-end items-center border h-[24px]`}>
        <button 
        onClick={()=>movetoHomeOnclickHandler()}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        home
        </button>
        <button 
        onClick={()=>movetoMyInfoOnclickHandler()}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        MyInfo
        </button>
        <button 
        onClick={()=>logoutOnclickHandler()}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        Logout
        </button>
			</div>
      :
      <div className={`sticky top-0 left-0 w-full mt-1 border-b-2 border-white flex justify-end items-center border h-[24px]`}>
        <button 
        onClick={()=>movetoHomeOnclickHandler()}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        home
        </button>
        <button 
        onClick={()=>signInHandleModal(true)}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        Sign In
        </button>
        <button 
        onClick={()=>signUpHandleModal(true)}
        className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl bg-[#588676] text-white">
        Sign Up
        </button>
			</div>
    }

    <SignIn show={showSigninPortal} signInHandleModal={signInHandleModal} passwordChangeHandleModal={passwordChangeHandleModal} signUpHandleModal={signUpHandleModal} />
    <PasswordChange show={showPasswordChangePortal} signInHandleModal={signInHandleModal} passwordChangeHandleModal={passwordChangeHandleModal} signUpHandleModal={signUpHandleModal}/>
    <SignUp show={showSignUpPortal} signInHandleModal={signInHandleModal} passwordChangeHandleModal={passwordChangeHandleModal} signUpHandleModal={signUpHandleModal}/>
      
    </>
  ) 
}
export default CommonHearder;