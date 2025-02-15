'use client';
import { RiArrowRightCircleLine } from "react-icons/ri";
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

export {ButtonLg, ButtonBase, ButtonSmall, ButtonSmallMove};



