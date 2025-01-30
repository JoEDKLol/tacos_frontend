'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Main = () => {


  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 
  
  const [menuColorButton, setMenuColorButton] = useState<string>("#ffffff"); //초기값
  const [menuColor, setMenuColor] = useState<string>(""); //초기값 

  const [menuSize, setMenuSize] = useState<string>("10"); //초기값


  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  function menuColorApply(){
    setMenuColor(menuColorButton);
  }

  function menuInputOnchage(e:any){
    setMenuColorButton(e.target.value)
  }

  function menuSizeUp(){
    let menuSizeNum = Number(menuSize);
    menuSizeNum++;

    setMenuSize(menuSizeNum + "")
  }

  function menuSizeDown(){
    let menuSizeNum = Number(menuSize);
    menuSizeNum--;

    setMenuSize(menuSizeNum + "")
  }
  

  return(
    <>  
      
      <div className="mb-1">
        <div className="flex justify-center items-center h-10 border-b bg-[#006341]">
          <p className="text-white text-xl">Menu Update</p>
        </div>
      </div>
      <div className=" flex justify-center ">
        
        <div className="  me-4">
          <p className="flex justify-center">BG-Color</p>
          <ColorButton color={bgColorButton} setColor={setBgColorButton}/>
          <p className="my-1 flex justify-between w-[100%] ">
            <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={bgColorButton}
            onChange={(e)=>bgInputOnchage(e)}
            />
            <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
            onClick={()=>bgColorApply()}
            >
            Apply
            </button>  
          </p>
        </div>

        <div className="">
          <p className="flex justify-center">Menu-Color</p>
          <ColorButton color={menuColorButton} setColor={setMenuColorButton}/>
          <p className="my-1 flex justify-between w-[100%] ">
            <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={menuColorButton}
            onChange={(e)=>menuInputOnchage(e)}
            />
            <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
            onClick={()=>menuColorApply()}
            >
            Apply
            </button>  
          </p>
        </div>

      </div>

      

      <div className={" h-[90vh] border p-1 " } style={{backgroundColor:bgColor}}>
        <div className="flex justify-center">
          <p className="" style={{fontSize:menuSize + "px", fontWeight:"bold", color:menuColor}}>MENU</p>
          <div className="ms-5 flex items-center ">
            <p className=" text-[20px] hover:text-[25px]" style={{ fontWeight:"bold", color:menuColor}} 
            onClick={()=>menuSizeUp()}
            ><IoIosArrowUp/></p>
            <p className=" text-[20px] hover:text-[25px]" style={{ fontWeight:"bold", color:menuColor}}
            onClick={()=>menuSizeDown()}
            ><IoIosArrowDown/></p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Main