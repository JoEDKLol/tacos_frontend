'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import QuillEditorScreen from "@/app/components/quillEditor/QuillEditorScreen";
import { useState } from "react";


const Main = () => {

  const [quillColorButton, setQuillColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값

  const [bgColorQuill, setBgColorQuill] = useState<string>(""); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 



  // useEffect(()=>{  
  //   // console.log(color); //{h: 0, s: 67, l: 31, a: 1}
  //   // setBgColorQuill(color); 
  //   // console.log("bg-[" + color + "]"); 
  //   // const strBgColor = "bg-[" + color + "]";

  //   // "bg-[#000000]"
  //   // setBgColor(strBgColor);      
  //   // bbcolor = strBgColor;
  //   // console.log(bgColor); 
  // },[color])
  function quillBgColorApply(){
    setBgColorQuill(quillColorButton);
  }

  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  function quillBgInputOnchage(e:any){
    setQuillColorButton(e.target.value)
  }

  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  return(
    <>  
      
      <div className="mb-1">
        <div className="flex justify-center items-center h-10 border-b bg-[#006341]">
          <p className="text-white text-xl">About Update</p>
        </div>
      </div>
      <div className=" flex justify-center ">
        <div className="me-5">
          <p className="flex justify-center">Quill BG-Color</p> 
          <ColorButton color={quillColorButton} setColor={setQuillColorButton}/>
          <p className="my-1 flex justify-between w-[100%]">
            <input className="text-sm p-1 ps-2 w-[130px] border border-[#006341] outline-none rounded" value={quillColorButton} 
            onChange={(e)=>quillBgInputOnchage(e)}
            />
            <button className="text-sm w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
            onClick={()=>quillBgColorApply()}
            >
            Apply
            </button>
          </p>
        </div>  
        <div className="">
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

      </div>

      

      <div className={" h-[90vh] border p-1 " } style={{backgroundColor:bgColor}}>
        <QuillEditorScreen bgColor={bgColorQuill}/>
      </div>
    </>
  );
};

export default Main