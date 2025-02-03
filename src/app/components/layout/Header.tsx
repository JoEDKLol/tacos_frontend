'use client';
import { TbHomeStar } from "react-icons/tb";
import { PiSignOutFill } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { LuPenLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import SignIn from "@/app/components/modals/SignIn";
import PasswordChange from "@/app/components/modals/PasswordChange";
import SignUp from "@/app/components/modals/SignUp";
import Image from "next/image";


interface logoSet {
  height : string
  width : string
  bgColor : string
  border : string
  borderColor : string
  ms : string
  me : string
  rounded : string
  customDesign : string
}


interface designSet {
  height : string
  width : string
  bgColor : string
  border : string
  borderColor : string
  customDesign : string
  imageYn : boolean
  imageUrl : string
  imageStyle : {

  }
}

interface titleDesignSet {
  height : string
  width : string
  bgColor : string
  border : string
  borderColor : string
  fontBold : string
  textSize : string
  textColor : string
  customDesign : string
}

interface menuBarDesignSet {
  height : string
  width : string
  bgColor : string
  border : string
  borderColor : string
  fontBold : string
  textSize : string
  textColor : string
  customDesign : string
}





const Header = () => {  
  const [showSigninPortal, setShowSigninPortal] = useState(false);
  const [showPasswordChangePortal, setShowPasswordChangePortal] = useState(false);
  const [showSignUpPortal, setShowSignUpPortal] = useState(false);

  const [logoSet, setLogoSet] = useState<logoSet>({ 
    height:" h-[100px]", width:" w-[100px]", bgColor:" bg-[#006341] " , border:" border-2 ", borderColor:" border-white ", ms:" ms-5 ",  me:" me-5 " , 
    rounded : " rounded " , customDesign : " shadow-sm "
  });

  //   object-fit: "contain", object-fit: "cover" 
  const [designSet, setDesigenSet] = useState<designSet>({
    height:" h-[200px]", width:" w-[100%]", bgColor:" bg-[#006341] " , border:" border-2 ", borderColor:" border-black " , customDesign : "  "
    , imageYn : true , imageUrl : "/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg" 
    , imageStyle : 
      { 
        objectFit: "contain"
        , borderRadius: '12px' 
        , overflow: "hidden" }
    
  });

  const [titleDesignSet, setTitleDesignSet] = useState<titleDesignSet>({
    height:" h-[50px] ", width:" w-[100%] ", bgColor:" bg-[#006341] " , border:" border-2 ", borderColor:" border-black " , customDesign : " "
    , fontBold: " font-bold ", textSize:" text-sm ", textColor:" text-white "
  });

  const [menuBarDesignSet, setMenuBarDesignSet] = useState<menuBarDesignSet>({
    height:" h-[30px] ", width:" w-[100%] ", bgColor:" bg-green-300 " , border:" border-2 ", borderColor:" border-green-400 " , customDesign : " "
    , fontBold: " font-bold ", textSize:" text-sm ", textColor:" text-white "
  });



  const [logoDesignStr, setLogoDesignStr] = useState<string>("")
  const [headerDesignStr, setHeaderDesignStr] = useState<string>("")
  const [titleDesignStr, setTitleDesignStr] = useState<string>("")
  const [menuBarDesignStr, setMenuBarDesignStr] = useState<string>("")

  useEffect(()=>{
    console.log("1");
    const logoDesign = logoSet.height
                       + logoSet.width
                       + logoSet.bgColor
                       + logoSet.border  
                       + logoSet.borderColor
                       + logoSet.ms
                       + logoSet.me
                       + logoSet.rounded
                       + " " + logoSet.customDesign + " "
                       
    setLogoDesignStr(logoDesign);

  },[logoSet])

  useEffect(()=>{
    console.log("2");
    const headerDesign = designSet.height
                       + designSet.width
                       + designSet.bgColor
                       + designSet.border  
                       + designSet.borderColor
                       + " " + designSet.customDesign + " "
                       
    setHeaderDesignStr(headerDesign);

  },[designSet])

  useEffect(()=>{
    console.log("3");
    const titleDesign = titleDesignSet.height
                       + titleDesignSet.width
                       + titleDesignSet.bgColor
                       + titleDesignSet.border  
                       + titleDesignSet.borderColor
                       + titleDesignSet.fontBold
                       + titleDesignSet.textSize
                       + titleDesignSet.textColor
                       + " " + titleDesignSet.customDesign + " "
                       
    setTitleDesignStr(titleDesign);
  },[titleDesignSet])

  useEffect(()=>{
    console.log("4");
    const menuBarDesign = menuBarDesignSet.height
                       + menuBarDesignSet.width
                       + menuBarDesignSet.bgColor
                       + menuBarDesignSet.border  
                       + menuBarDesignSet.borderColor
                       + menuBarDesignSet.fontBold
                       + menuBarDesignSet.textSize
                       + menuBarDesignSet.textColor
                       + " " + menuBarDesignSet.customDesign + " "
                       
    setMenuBarDesignStr(menuBarDesign);
  },[menuBarDesignSet])

  // const signInHandleModal = (showYn:boolean) => {
  //   setShowSigninPortal(showYn);
  // };

  // const passwordChangeHandleModal = (showYn:boolean) => {
  //   setShowPasswordChangePortal(showYn);
  // };

  // const signUpHandleModal = (showYn:boolean) => {
  //   setShowSignUpPortal(showYn);
  // };

  

  return( 
    <>
    <header
    className="sticky top-0 left-0  w-[100%]" 
    >
      <div className="flex justify-end my-1 ">
        <p className="border p-1">
        signin
        </p>
        <p className="border p-1">
        signout
        </p>
      </div>
      <div className={headerDesignStr + " flex justify-between items-center relative -z-50 "}>
        
        {
          (designSet.imageYn)?
          <Image
            src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
            alt=""
            quality={30} 
            layout="fill"
            loading="lazy"
            style={designSet.imageStyle}
        />:""
        }
        

        <p className={" relative  " + logoDesignStr }>
          <Image
            src={"/landingImgs/_8f324ccf-2985-4ba4-9e12-f5f6e8119eea.jpg"}
            alt=""
            quality={30} 
            layout="fill"
            loading="lazy"
            style={{ objectFit: "cover", borderRadius: '12px' }}
          />
        </p>

        <p className={"relative mx-2 flex justify-center " + titleDesignStr }>
          Taco Oaxaca
        </p>
        <p className="mx-2">
          
        </p>
      </div>  
      <div className= {" flex justify-center items-center " + menuBarDesignStr }>
        <p className="mx-3 ">
        home
        </p>
        <p className="mx-3">
        about
        </p>
        <p className="mx-3">
        menu
        </p>
      </div>
    </header>

    </>
  );
};

export default Header