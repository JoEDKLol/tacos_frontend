'use client';

import LoginMove from "@/app/components/common/LoginMove";
import userState from "@/app/store/user";
const Main = () => {

  const userStateSet = userState();
  // console.log(userStateSet.id);



  return(
    <>{
      (userStateSet.id)?<div>management</div>:
      <LoginMove/>
    }
    
    </>
  );
};

export default Main