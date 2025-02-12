"use client";

import { useEffect } from "react";
// import { accesstokenState } from "@/app/store/token";
import { usePathname } from "next/navigation";
import { getAccessToken, storeAccessToken } from "@/app/utils/common";
import { transaction } from "@/app/utils/axios";
import loadingScreenShow from "@/app/store/loadingScreen";
import errorScreenShow from "@/app/store/errorScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";

/*
    모든페이지에서 호출되는 공통 페이지
*/
const CommonTransaction = ({ children }: any) => {

  const path = usePathname();

  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const userStateSet = userState();

  //페이지이동시 토큰 검증
  useEffect(() => {
    if(getAccessToken()){
      getAccessTokenApi(); 
    }else{
      getAccessTokenCheck();
    }
  }, [path]);
    
    async function getAccessTokenApi(){
        const retObj = await transaction("get", "getAccessToken", {}, "", false, true, screenShow, errorShow);
        if(retObj.sendObj.code === "2000"){
          //유저정보는 zustand
          //access토큰 정보는 session storege클래스에 담아준다.
          userStateSet.userSet(retObj.sendObj.resObj);
          storeAccessToken(retObj.accessToken);
        }else{
          //access token get 실패
          userStateSet.userSet({ id:"", email:"", userseq:0});
        }
    }

    async function getAccessTokenCheck(){  
      const retObj = await transactionAuth("post", "checkaccessToken", {}, "", false, true, screenShow, errorShow);
      if(retObj.sendObj.success === 'y'){
        userStateSet.userSet(retObj.sendObj.resObj);
      }else{
          getAccessTokenApi();
      }
    }

    return <>{children}</>;
};

export default CommonTransaction;