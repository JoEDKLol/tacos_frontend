'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { ButtonBase, ButtonRefresh, ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import ManageMove from "@/app/components/common/ManageMove";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";

interface categoryList {
  _id:string
  userseq : number
  restaurantseq : number
  name : string
  order : number
  selected : string
}

interface categoriesList extends Array<categoryList>{}

const Main = () => {

  const userStateSet = userState();
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);


  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 
  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [homeLayoutYn, setHomeLayoutYn] = useState<boolean>(false);

  const [categoryName, setCategoryName] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const [inputStatus, setInputStatus] = useState<boolean>(true);

  const [categories, setCategories] = useState<categoriesList>([]);
  const [updateYn, setUpdateYn] = useState<boolean>(false);

  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(()=>{
    if(userStateSet.userseq > 0){
      menuLayoutSearch();
      categorySearch();
    }
  },[userStateSet]);


  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      menu : {
        bgColor:bgColor, 
      }
    }

    const retObj = await transactionAuth("post", "management/menusave", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
  }

  function colorBoxClose(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("hidden");

  }

  function colorBoxOpen(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("block");
  }

  function mainSearch(){
    menuLayoutSearch();
    categorySearch();
  }
  

  async function menuLayoutSearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/menulayoutsearch", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success === "y"){
      if(retObj.sendObj.resObj.menu){
        setLayOut(retObj.sendObj.resObj.menu);
      }else{
        setLayOut(
          {
            bgColor:"#ffffff",
            // bgColorQuill:"#ffffff", 
            // content:"", 
            // quillWidth:"70",
            // quillTop:"10", 
            // locationColor:"#000000", 
            // addressColor:"#000000", 
            // phoneNumberColor:"#000000", 
            // locationTextSize:"15", 
            // addressTextSize:"15", 
            // phoneNumberTextSize:"15", 
          }
        );
        
        
      }

      setHomeLayoutYn(true);
    }else{
      setHomeLayoutYn(false);
    }

  }

  async function categorySearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/categorysearch", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success === "y"){
      
      if(retObj.sendObj.resObj.length > 0){
        
        for(let i=0; i<retObj.sendObj.resObj.length; i++){
          retObj.sendObj.resObj[i].selected = " hover:bg-slate-100 "
        }

        setCategories(retObj.sendObj.resObj);
      
      }
        
      
    }else{
      
    }

  }

  function setLayOut(layOutObj:any){
    setBgColorButton(layOutObj.bgColor);
    setBgColor(layOutObj.bgColor);
  }

  function categoryOnChange(e:any){
    setCategoryName(e.target.value);
  }

  function orderOnChange(e:any){

    const orderNum = e.target.value;
    if(orderNum < 0){
      setOrder(0);
      return;
    }

    setOrder(e.target.value);
  }

  function newOnClick(){
    setCategoryName("");
    setOrder(0);
    setUpdateYn(false);
    setInputStatus(false);
    setCategoryId("");

    for(let i=0; i<categories.length; i++){
      categories[i].selected = " hover:bg-slate-100 ";
    }

  }

  async function categorySaveOnClick(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      name : categoryName,
      order : order, 
    }

    const retObj = await transactionAuth("post", "management/categorysave", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === "y"){
      categorySearch();
    }
  }

  function categoryTableListOnClick(obj:any){
    // console.log(val);
    const choosenIndex = categories.findIndex((val) => val._id === obj._id);
    // console.log(choosenIndex);
    // categories[choosenIndex].selected
    // console.log(categories[choosenIndex].selected);

    for(let i=0; i<categories.length; i++){
      if(i===choosenIndex){
        categories[i].selected = " bg-slate-300 ";
      }else{
        categories[i].selected = " hover:bg-slate-100 ";
      }
    }
    setCategories([...categories]);
    setCategoryName(categories[choosenIndex].name);
    setOrder(categories[choosenIndex].order);
    setInputStatus(false);
    setUpdateYn(true);
    setCategoryId(obj._id);
  }

  
  async function categoryUpdateOnClick(){
    const obj = {
      _id : categoryId, 
      name : categoryName,
      order : order,
      email : userStateSet.email,
    }

    const retObj = await transactionAuth("post", "management/categoryupdate", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === "y"){
      categorySearch();
    }
  }

  async function categoryDeleteOnClick(){
    
  }

  return(
    <>  
      {
        (userStateSet.id)?
        <>
          <div className="w-full" >
            <div className="flex justify-center items-center h-10 bg-[#006341]">
              <p className="text-white text-xl">Menu Update</p>
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
                  onClick={()=>mainSearch()}
                  />
                </p>
                <p><ButtonBase onClick={()=>save()} name={"SAVE"}/> </p>
              </div>

              <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                {/* color component */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("1")} name={"BG-Color"}/>
                  </p> 
                  <div className={ colorBox1 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("1")}
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
              </div>

              <div className="flex justify-center border-t border-[#006341] ">
                <div className="grid grid-cols-1
                2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1
                ">
                  <div className="my-2 max-w-[300px] max-h-[150px] overflow-y-scroll border">
                    <table className="w-full  overflow-scroll">
                      <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                          <th className="px-2 py-1 max-w-[250px]">
                            <p className="text-sm font-bold">
                              name
                            </p>
                          </th>
                          <th className="px-2 py-1 w-[50px]">
                            <p className="text-sm font-bold">
                              order
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {
                          categories.map((val, index) => {
                            return(
                              <tr key={index} 
                              onClick={()=>categoryTableListOnClick(val)}
                              className={val.selected + "  "}>
                                  <td className="px-2 py-1 text-sm ">{val.name}</td>
                                  <td className="px-2 py-1 text-sm text-center">{val.order}</td>
                              </tr>
                            )
                          })
                        }
                        
                        
                      </tbody>
                    </table>
                  </div>

                  <div className="mx-5 my-2">
                    <div className="grid grid-cols-1 ">
                      <p className="mb-2 text-sm font-bold ">name
                        <input type="text" 
                        disabled={inputStatus}
                        className= 
                        {`text-sm font-normal
                        ms-2 border rounded outline-none ps-2 py-1`} 
                        onChange={(e)=>categoryOnChange(e)}
                        value={categoryName}/>
                      </p>
                      <p className="text-sm w-full font-bold flex justify-normal ">order
                        <input type="number" 
                        disabled={inputStatus}
                        className=
                        {`text-sm font-normal
                        ms-2 w-[40px] border rounded outline-none ps-2 `} 
                        onChange={(e)=>orderOnChange(e)}
                        value={order}/>
                        
                        
                      </p>
                      <p className="flex justify-end">
                        <button 
                        onClick={()=>newOnClick()}
                        className="border rounded px-1 text-sm">new</button>
                        
                        {
                          (updateYn)?
                          <>
                          <button 
                          onClick={()=>categoryUpdateOnClick()}
                          className="border rounded px-1 ms-1 text-sm">update</button>
                          <button 
                          onClick={()=>categoryDeleteOnClick()}
                          className="border rounded px-1 ms-1 text-sm">delete</button>
                          </>
                          :
                          <button 
                          onClick={()=>categorySaveOnClick()}
                          className="border rounded px-1 ms-1 text-sm">save</button>
                        }
                        
                        
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* menu start */}
              <div className={" h-[110vh] border p-1 flex justify-center " } style={{backgroundColor:bgColor}}>

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