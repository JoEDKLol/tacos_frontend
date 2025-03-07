'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { ButtonBase, ButtonRefresh, ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import ManageMove from "@/app/components/common/ManageMove";
import QuillEditorScreen from "@/app/components/quillEditor/QuillEditorScreen";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";


const Main = () => {

  const userStateSet = userState();
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);

  const [quillColorButton, setQuillColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값

  const [bgColorQuill, setBgColorQuill] = useState<string>(""); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 

  const [content, setContent] = useState("");
  const [readOnly] = useState(false);
  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [colorBox2, setColorBox2] = useState<string>("hidden");

  const [homeLayoutYn, setHomeLayoutYn] = useState<boolean>(false);

  const [quillWidth, setQuillWidth] = useState<string>("70");
  const [quillTop, setQuillTop] = useState<string>("10");
  
  useEffect(()=>{
    if(userStateSet.userseq > 0){
      homeLayoutSearch();
    }
  },[userStateSet.userseq])

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

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      home : {
        bgColorQuill:bgColorQuill, 
        bgColor:bgColor, 
        content:content, 
        quillWidth:"70", 
        quillTop:quillTop
      }
    }

    const retObj = await transactionAuth("post", "management/homesave", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
  }

  function colorBoxClose(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("hidden");
    if(colorBoxNum === "2") setColorBox2("hidden");
  }

  function colorBoxOpen(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("block");
    if(colorBoxNum === "2") setColorBox2("block");
  }

  async function homeLayoutSearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/homelayoutsearch", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === "y"){

      if(retObj.sendObj.resObj.home){
        setLayOut(retObj.sendObj.resObj.home);
      }else{
        setLayOut(
          {
            bgColor:"#ffffff",
            bgColorQuill:"#ffffff", 
            content:"", 
            quillWidth:"70",
            quillTop:"10"
          }
        );
      }

      setHomeLayoutYn(true);
    }else{
      setHomeLayoutYn(false);
    }

  }

  function setLayOut(layOutObj:any){
    setQuillColorButton(layOutObj.bgColorQuill);
    setBgColorButton(layOutObj.bgColor);
    setBgColorQuill(layOutObj.bgColorQuill);
    setBgColor(layOutObj.bgColor);
    setContent(layOutObj.content);
    setQuillWidth(layOutObj.quillWidth);
    setQuillTop(layOutObj.quillTop);

  }

  function quillTopUp(){
    let quillTopNum = Number(quillTop);
    quillTopNum = quillTopNum + 5;
    setQuillTop(quillTopNum + "")
  }

  function quillTopDown(){
    let quillTopNum = Number(quillTop);
    quillTopNum = quillTopNum - 5;
    if(quillTopNum < 0) return;
    setQuillTop(quillTopNum + "")
  }

  function quillWidthDown(){
    let quillWidthNum = Number(quillWidth);
    quillWidthNum = quillWidthNum - 5;
    if(quillWidthNum < 0) return;
    setQuillWidth(quillWidthNum + "")
  }

  function quillWidthUp(){
    let quillWidthNum = Number(quillWidth);
    quillWidthNum = quillWidthNum + 5;
    setQuillWidth(quillWidthNum + "")
  }

  return(
    <>  
      {
        (userStateSet.id)?
        <>
          <div className="w-full" >
            <div className="flex justify-center items-center h-10 bg-[#006341]">
              <p className="text-white text-xl">home Update</p>
            </div>
          </div>


          {
            (!homeLayoutYn)?
            <div>
              <ManageMove/>
            </div>:
            <div>
              <div className="flex justify-end p-1 border border-white bg-[#739e8f] ">
                <p className="flex justify-center items-center mr-1">
                  <ButtonRefresh 
                  onClick={()=>homeLayoutSearch()}
                  />
                </p>
                <p><ButtonBase onClick={()=>save()} name={"SAVE"}/> </p>
              </div>

              <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("1")} name={"Quill-Color"}/>
                  </p> 
                  <div className={ colorBox1 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("1")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={quillColorButton} setColor={setQuillColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={bgColorButton} 
                        onChange={(e)=>quillBgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>quillBgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>  

                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("2")} name={"BG-Color"}/>
                  </p> 
                  <div className={ colorBox2 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("2")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={bgColorButton} setColor={setBgColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={bgColorButton} 
                        onChange={(e)=>bgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>bgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>
                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Quill-Top</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>quillTopUp()}
                    ><IoIosArrowUp/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>quillTopDown()}
                    ><IoIosArrowDown/></button>
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1 px-1">Quill-Width</p>
                  <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                    onClick={()=>quillWidthDown()}
                    ><IoIosArrowBack/></button>
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] " style={{ fontWeight:"bold"}}
                    onClick={()=>quillWidthUp()}
                    ><IoIosArrowForward/></button>
                  </div>

                </div>


              </div>
              
              

              <div className={" h-[100%] border p-1 flex justify-center " } style={{backgroundColor:bgColor, paddingTop:quillTop + "px"}}>
                <QuillEditorScreen bgColor={bgColorQuill} content={content} setContent={setContent} readOnly={readOnly} styleType={"style"} quillWidth={quillWidth} />
              </div>
            </div>
          }

          
        </>
        :<LoginMove/>



      }
      
    </>
  );
};

export default Main