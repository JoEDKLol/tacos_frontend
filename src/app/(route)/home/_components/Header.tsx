'use client';
import { TbHomeStar } from "react-icons/tb";
import { PiSignOutFill } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { LuPenLine } from "react-icons/lu";
import TEST from "@/app/components/modals/Test";
import { useState } from "react";
import CustomConfirm from "@/app/components/modals/CustomConfirm";

const Header = () => {  
  const [showPortal, setShowPortal] = useState(false);
  const [confirm, setConfirm] = useState(false);
    const handleModal = () => {
      setShowPortal(!showPortal);
      console.log(confirm);
    };

  return( 
    <header
    className="sticky top-0 left-0 w-full flex justify-between items-center border h-[60px] bg-[#006341] 
    "
    >
      <div className="flex justify-normal items-center">
          <p className="flex justify-center mx-1 w-[70px] text-white">LOGO</p>
          <div className="relative text-gray-600">
            <input type="search" name="serch" placeholder="Search" className="w-[150px] 
            2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:w-[260px]
            border bg-white h-10 px-3 pr-6 rounded text-sm focus:outline-none"
            // onChange={(e)=>searchTextOnchangeHandler(e)}
            // onKeyDown={(e)=>searchTextOnKeyDownHandler(e)}

            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2"
            // onClick={(e)=>priSearch()}
            >
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
            </button>
          </div>
          <CustomConfirm show={showPortal} handleModal={handleModal} setShowPortal={setShowPortal} setConfirm={setConfirm}/>
      </div>
      <div className="flex justify-end me-4">
        {
          (1!==1)?
          <>
            <button className="group hidden 2xl:block xl:block lg:block md:block sm:hidden bg-white
            bg-transparent hover:bg-[#CE1126] font-semibold  py-1 px-2 mr-2   hover:border-transparent rounded"
            // onClick={()=>movetoMyBlogOnclickHandler()}
            >
            <span className="group-hover:text-white block text-[#CE1126]">MyBlog</span>
            </button>
            <p className="block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block bg-white
            text-2xl mr-1 rounded hover:bg-[#CE1126]
            cursor-pointer p-1
            "
            // onClick={()=>movetoMyBlogOnclickHandler()}
            ><span className="text-[#CE1126] hover:text-white"><TbHomeStar /></span></p>

            <button className="group hidden 2xl:block xl:block lg:block md:block sm:hidden bg-white
            bg-transparent hover:bg-[#CE1126] text-[#CE1126] font-semibold   py-1 px-2 mr-2   hover:border-transparent rounded"
            // onClick={()=>logoutOnclickHandler()}

            >
            <span className="group-hover:text-white block text-[#CE1126]">Logout</span>
            </button>
            <p className="block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block bg-white
            text-2xl rounded hover:bg-[#CE1126]
            cursor-pointer p-1
            "
            // onClick={()=>logoutOnclickHandler()}
            ><span className="text-[#CE1126] hover:text-white"><PiSignOutFill  /></span></p>
          </>
          :
          <>
            <button className="group hidden 2xl:block xl:block lg:block md:block sm:hidden bg-white
            bg-transparent hover:bg-[#CE1126] font-semibold   py-1 px-2 mr-2  hover:border-transparent rounded"
            // onClick={()=>loginOnclickHandler()}
            onClick={()=>handleModal()}
            
            >
            <span className="group-hover:text-white block text-[#CE1126]">Sign In</span>
            </button>
            <p className="block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block mr-1 bg-white
            text-2xl rounded hover:bg-[#CE1126] 
            cursor-pointer p-1
            "
            // onClick={()=>loginOnclickHandler()}
            ><span className="text-[#CE1126] hover:text-white"><PiSignInBold /></span></p>

            <button className="group hidden 2xl:block xl:block lg:block md:block sm:hidden bg-white
            bg-transparent hover:bg-[#CE1126] font-semibold   py-1 px-2 hover:border-transparent rounded"
              // onClick={()=>siginUpOnclickHandler()}
            >
            <span className="group-hover:text-white block text-[#CE1126]">Sign Up</span>
            </button>
            <p className="block 2xl:hidden xl:hidden lg:hidden md:hidden sm:block bg-white
            text-2xl rounded hover:bg-[#CE1126]
            cursor-pointer p-1
            "
            // onClick={()=>siginUpOnclickHandler()}
            ><span className="text-[#CE1126] hover:text-white"><LuPenLine /></span></p>
          </>
        }
        
      </div>


    </header>
  );
};

export default Header