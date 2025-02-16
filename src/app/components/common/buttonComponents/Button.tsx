'use client';
import { RiArrowRightCircleLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
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
    ><span className="pt-[1px] pe-[2px] text-[14px]"><CiSettings/></span>{props.name}</button> 
  );
}

const ButtonTag = (props:any) => {
  return (
    <p 
    className=" group-hover: bg-white  text-[#006341] 
    border-[#006341] border ps-2 pe-1 rounded text-sm font-bold
    flex justify-center me-1 mt-1" 
    >{props.name}
    <span 
    onClick={props.onClick}
    className=" cursor-pointer ms-1 pt-[3px] ps-[2px] text-[14px]"><IoCloseSharp/></span>
    </p> 
  );
}

export {ButtonLg, ButtonBase, ButtonSmall, ButtonSmallMove, ButtonTag, ButtonSmallSettingMove};



