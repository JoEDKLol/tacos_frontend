'use client';
import { RiArrowRightCircleLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { PiHashStraightBold } from "react-icons/pi";
import { GrRefresh } from "react-icons/gr";
import { CgClose } from "react-icons/cg";
const ButtonLg = (props:any) => {
  return (

    <button
    onClick={props.onClick}
    className="hover:bg-[#006341] bg-white hover:text-white text-[#006341] 
    border-[#006341] border px-3 py-1 rounded text-lg font-bold" 
    >{props.name}</button>
  );
}

const ButtonBase = (props:any) => {
  return (
    <button
    onClick={props.onClick}
    className="hover:bg-[#006341] bg-white hover:text-white text-[#006341] 
    border-[#006341] border px-3 rounded text-base font-bold" 
    >{props.name}</button>
  );
}

const ButtonSmall = (props:any) => {
  return (
    <button
    onClick={props.onClick}
    className="hover:bg-[#006341] bg-white hover:text-white text-[#006341] 
    border-[#006341] border px-3 py-1 rounded text-sm font-bold" 
    >{props.name}</button>
  );
}

const ButtonSmallMove = (props:any) => {
  return (
    <button
    onClick={props.onClick}
    className="hover:bg-[#006341] bg-white hover:text-white text-[#006341] 
    border-[#006341] border px-1 rounded text-xs font-bold
    flex justify-center" 
    ><span className="pt-[1px] pe-[2px] text-[14px]"><RiArrowRightCircleLine/></span>{props.name}</button> 
  );
}

const ButtonSmallSettingMove = (props:any) => {
  return (
    <button
    onClick={props.onClick}
    className="hover:bg-[#006341] bg-white hover:text-white text-[#006341] 
    border-[#006341] border px-1 rounded text-xs font-bold
    flex justify-center" 
    ><span className="pt-[1px] pe-[2px] text-[14px] "><CiSettings/></span>{props.name}</button> 
  );
}

const ButtonTag = (props:any) => {
  return (
    <p 
    className=" group-hover: bg-white  text-[#006341] 
    border-[#006341] border ps-2 pe-1 rounded-xl text-sm
    flex justify-center me-1 mt-1" 
    >{props.name}
    <span 
    onClick={props.onClick}
    className=" cursor-pointer ms-1 pt-[3px] ps-[2px] text-[14px]"><IoCloseSharp/></span>
    </p> 
  );
}

const ButtonTagSearch = (props:any) => {
  return (
    <button 
    className=" bg-white  text-red-500 hover:bg-red-500 hover:text-white
    border-[#006341] border  rounded
    flex justify-center mx-1 p-1
    cursor-pointer text-lg 
    " 
    onClick={props.onClick}
    >
      <PiHashStraightBold />
    </button> 
  );
}

const ButtonTagListInMainSearch = (props:any) => {
  return (
    <button 
    className=" bg-[#006341]  text-white hover:bg-white hover:text-[#006341]
    border-[#006341] border rounded-md
    flex justify-center px-2 py-1 me-1
    cursor-pointer text-xs
    " 
    onClick={props.onClick}
    >
    {props.name}
    </button> 
  );
}

const ButtonHashTagAddMainSearch = (props:any) => {
  return (
    <button 
    className=" bg-white  text-red-500 hover:bg-red-500 hover:text-white
    rounded-md
    flex justify-center items-center px-1 me-1
    cursor-pointer text-xs
    " 
    onClick={props.onClick}
    >
    {props.name}
    </button> 
  );
}

const ButtonHashTagAddMainSearchIcon = (props:any) => {
  return (
    <button 
    className=" bg-white  text-red-500 hover:bg-red-500 hover:text-white
    rounded-md
    flex justify-center items-center px-1 me-1
    cursor-pointer text-xs
    " 
    onClick={props.onClick}
    >
    {props.name}
    </button> 
  );
}

const ButtonTagHome = (props:any) => {
  return (
    <p 
    className=" bg-[#006341] text-white
    border-[#006341] border px-2 py-1 rounded-md text-sm 
    flex justify-center m-1" 
    >{props.name}
    </p> 
  );
}

const ButtonNextSearcHome = (props:any) => {
  return (
    <button
    className=" bg-white  text-[#006341] hover:bg-[#006341] hover:text-white
    border-[#006341] border px-3 py-1 rounded text-base 
    flex justify-center" 
    onClick={props.onClick}
    >{props.name}
    </button> 
  );
}

const ButtonRefresh = (props:any) => {
  return (
    <button
    className=" bg-white  text-[#006341] hover:bg-[#006341] hover:text-white
    border-[#006341] border px-1 py-1 rounded text-base 
    flex justify-center" 
    onClick={props.onClick}
    ><GrRefresh/>
    </button> 
  );
}

const ButtonClose = (props:any) => {
  return (
    <button
    className=" bg-white  text-[#006341] hover:bg-[#006341] hover:text-white
    border-[#006341] border px-1 py-1 rounded text-base 
    flex justify-center" 
    onClick={props.onClick}
    ><CgClose/>
    </button> 
  );
}

const ButtonComment = (props:any) => {
  return (
    <button
    className=" bg-white  text-[#006341] hover:bg-[#006341] hover:text-white
    border-[#006341] border px-2 py-1 rounded-full text-xs 
    flex justify-center" 
    onClick={props.onClick}
    >{props.name}
    </button> 
  );
}



export {ButtonLg, ButtonBase, ButtonSmall, ButtonSmallMove, ButtonTag, 
  ButtonSmallSettingMove, ButtonTagSearch, ButtonTagListInMainSearch
  , ButtonHashTagAddMainSearch, ButtonHashTagAddMainSearchIcon, ButtonTagHome
  , ButtonNextSearcHome, ButtonRefresh, ButtonClose, ButtonComment
};



