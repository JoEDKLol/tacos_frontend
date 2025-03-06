'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { ButtonBase, ButtonCommentSave, ButtonRefresh, ButtonSmall } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
import ManageMove from "@/app/components/common/ManageMove";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { transactionFile } from "@/app/utils/axiosFile";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { FaRegWindowClose } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

interface categoryList {
  _id:string
  userseq : number
  restaurantseq : number
  name : string
  order : number
  selected : string
}

interface categoriesList extends Array<categoryList>{}

interface menuList {
  _id:string
  userseq : number
  restaurantseq : number
  categoryid : string
  img : string
  thumbImg : string
  name : string
  description : string
  price : string
  selected : string
}

interface menusList extends Array<menuList>{}

const Main = () => {

  const userStateSet = userState();
  const path = usePathname();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();

  let restaurantName = path.split("/")[1];
  restaurantName = decodeURIComponent(restaurantName);


  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff"); //초기값
  const [bgColor, setBgColor] = useState<string>(""); //초기값 
  const [cabgColorButton, setCabgColorButton] = useState<string>("#ffffff"); //초기값
  const [cabgColor, setCabgColor] = useState<string>(""); //초기값 
  const [caTextColorButton, setCaTextColorButton] = useState<string>("#ffffff"); //초기값
  const [caTextColor, setCaTextColor] = useState<string>(""); //초기값
  
  const [caBorderColorButton, setCaBorderColorButton] = useState<string>("#ffffff"); //초기값
  const [caBorderColor, setCaBorderColor] = useState<string>(""); //초기값 

  const [colorBox1, setColorBox1] = useState<string>("hidden");
  const [colorBox2, setColorBox2] = useState<string>("hidden");
  const [colorBox3, setColorBox3] = useState<string>("hidden");
  const [colorBox4, setColorBox4] = useState<string>("hidden");
  const [colorBox5, setColorBox5] = useState<string>("hidden");
  const [colorBox6, setColorBox6] = useState<string>("hidden");
  const [colorBox7, setColorBox7] = useState<string>("hidden");
  const [colorBox8, setColorBox8] = useState<string>("hidden");
  const [colorBox9, setColorBox9] = useState<string>("hidden");
  const [colorBox10, setColorBox10] = useState<string>("hidden");


  const [homeLayoutYn, setHomeLayoutYn] = useState<boolean>(false);

  const [categoryName, setCategoryName] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const [inputStatus, setInputStatus] = useState<boolean>(true);

  const [categories, setCategories] = useState<categoriesList>([]);
  const [updateYn, setUpdateYn] = useState<boolean>(false);

  const [categoryId, setCategoryId] = useState<string>("");
  const [menuScreenYn, setMenuScreenYn] = useState<boolean>(false);

  const [img, setImg] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<string>("");
  const [menuId, setMenuId] = useState<string>("");
  const [menuCategoryId, setMenuCategoryId] = useState<string>("");
  const [menuName, setMenuName] = useState<string>("");
  const [menuDescription, setMenuDescription] = useState<string>("");
  const [menuPrice, setMenuPrice] = useState<string>("");
  const [menuUpdateYn, setMenuUpdateYn] = useState<boolean>(false);

  const [menus, setMenus] = useState<menusList>([]);
  const [categoryScreenYn, setCategoryScreenYn] = useState<boolean>(true);
  

  useEffect(()=>{
    if(userStateSet.userseq > 0){
      menuLayoutSearch();
      categorySearch();
      menuSearch();
    }
  },[userStateSet]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < categoryName.length; i++) {
      const currentByte = categoryName.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setCategoryName(categoryName.substring(0, i));
        break;
      }
    }
  },[categoryName]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < menuName.length; i++) {
      const currentByte = menuName.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setMenuName(menuName.substring(0, i));
        break;
      }
    }
  },[menuName]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < menuDescription.length; i++) {
      const currentByte = menuDescription.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 200){
        setMenuDescription(menuDescription.substring(0, i));
        break;
      }
    }
  },[menuDescription]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < menuPrice.length; i++) {
      const currentByte = menuPrice.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 6){
        setMenuPrice(menuPrice.substring(0, i));
        break;
      }
    }
  },[menuPrice]);

// color start
  function bgInputOnchage(e:any){
    setBgColorButton(e.target.value)
  }

  function bgColorApply(){
    setBgColor(bgColorButton);
  }

  function caBgInputOnchage(e:any){
    setCabgColorButton(e.target.value)
  }

  function caBgColorApply(){
    setCabgColor(cabgColorButton);
  }

  function caTextInputOnchage(e:any){
    setCaTextColorButton(e.target.value)
  }

  function caTextColorApply(){
    setCaTextColor(caTextColorButton);
  }

  function caBorderInputOnchage(e:any){
    setCaBorderColorButton(e.target.value)
  }

  function caBorderColorApply(){
    setCaBorderColor(caBorderColorButton);
  }

// color end
  

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      menu : {
        bgColor:bgColor, 
      }
    }

    const retObj = await transactionAuth("post", "management/menulayoutsave", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
  }

  function colorBoxClose(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("hidden");
    if(colorBoxNum === "2") setColorBox2("hidden");
    if(colorBoxNum === "3") setColorBox3("hidden");
    if(colorBoxNum === "4") setColorBox4("hidden");
    if(colorBoxNum === "5") setColorBox5("hidden");
    if(colorBoxNum === "6") setColorBox6("hidden");
    if(colorBoxNum === "7") setColorBox7("hidden");
    if(colorBoxNum === "8") setColorBox8("hidden");
    if(colorBoxNum === "9") setColorBox9("hidden");
    if(colorBoxNum === "10") setColorBox10("hidden");

  }

  function colorBoxOpen(colorBoxNum:string){
    if(colorBoxNum === "1") setColorBox1("block");
    if(colorBoxNum === "2") setColorBox2("block");
    if(colorBoxNum === "3") setColorBox3("block");
    if(colorBoxNum === "4") setColorBox4("block");
    if(colorBoxNum === "5") setColorBox5("block");
    if(colorBoxNum === "6") setColorBox6("block");
    if(colorBoxNum === "7") setColorBox7("block");
    if(colorBoxNum === "8") setColorBox8("block");
    if(colorBoxNum === "9") setColorBox9("block");
    if(colorBoxNum === "10") setColorBox10("block");
  }

  function mainSearch(){
    menuLayoutSearch();
    categorySearch();
    menuSearch();
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

  async function menuSearch(){
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
    }

    const retObj = await transactionAuth("get", "management/menusearch", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success === "y"){
      setMenus(retObj.sendObj.resObj)
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
    const obj = {
      _id : categoryId, 
    }

    const retObj = await transactionAuth("post", "management/categorydelete", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === "y"){
      categorySearch();
    }
  }

  function setMenuParInit(){
    setMenuUpdateYn(false);
    setMenuCategoryId("");
    setImg("");
    setMenuScreenYn(false);
    setMenuName("");
    setMenuPrice("");
    setMenuDescription("");
    setMenuId("");
  }

  function menuOnClick(){
    setMenuParInit();
    setMenuScreenYn(true);
  }

  function close(){
    setMenuParInit();
    setMenuScreenYn(false);
  }

  function menuNameOnChange(e:any){
    setMenuName(e.target.value);
  }

  function menuPriceOnChange(e:any){
    setMenuPrice(e.target.value);
  }

  function menuDescriptionOnChange(e:any){
    setMenuDescription(e.target.value);
  }

  async function menuSave(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      categoryid : menuCategoryId, 
      img:img, 
      thumbImg:thumbImg, 
      name:menuName, 
      description:menuDescription, 
      price:menuPrice
    }

    const retObj = await transactionAuth("post", "management/menusave", obj, "", false, true, screenShow, errorShow);
    // console.log(retObj);
    if(retObj.sendObj.success === "y"){

    }
  }

  async function menuUpdate(){
    const obj = {
      menuId : menuId, 
      email : userStateSet.email,
      categoryid : menuCategoryId, 
      img:img, 
      thumbImg:thumbImg, 
      name:menuName, 
      description:menuDescription, 
      price:menuPrice
    }

    
    const retObj = await transactionAuth("post", "management/menuupdate", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === "y"){
      menuSearch();
      setMenuParInit();

    }
  }

  async function menuFileUploadHandler(e:any){

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 

    const file = e.target.files[0]; 
    if(!file) return;
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      // maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };



    try {

      const compressedFile = await imageCompression(file, options);
      const imgUploadRes = await transactionFile("res/fileUpload", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        setImg(imgUploadRes.sendObj.resObj.img_url);
        setThumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {
      //console.log(error)
    }

  }

  function menuDeleteImg(){
    setImg("");
    setThumbImg("");
  }

  function changeCategory(e:any){
    setMenuCategoryId(e.target.value)
  }

  function menuUpdateScreen(obj:any){

    setMenuUpdateYn(true);
    setMenuCategoryId(obj.categoryid);
    setImg(obj.img);
    setMenuScreenYn(true);
    setMenuName(obj.name);
    setMenuPrice(obj.price);
    setMenuDescription(obj.description);
    setMenuId(obj._id);

  }

  async function changeCategoryMenu(e:any) {
    
    const obj = {
      userseq : userStateSet.userseq, 
      restaurantname : restaurantName, 
      categoryid : e.target.value
    }

    const retObj = await transactionAuth("get", "management/menusearch", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success === "y"){
      setMenus(retObj.sendObj.resObj)
    }
  }

  function closeCategory(){
    setCategoryScreenYn(!categoryScreenYn);
  }

  return(
    <>  
      {
        (userStateSet.id)?
        <div className="">
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
            <div className="relative">
              {/* menu registration screen start */}

              {
                (menuScreenYn)?
                <div className="absolute z-10">
                  <div className="fixed w-full h-full">
                    
                    <div className="flex justify-center  w-full h-full">
                      <div className="border-2 rounded bg-white w-[300px] h-[550px] border-[#006341] ">
                        <div className="flex justify-end h-[24px] bg-[#006341] ">
                          <p className="mr-1 text-lg mt-0.5 text-white  cursor-pointer "
                          onClick={()=>close()}
                          >
                            <FaRegWindowClose />
                          </p>
                        </div>
                        <div className="grid grid-cols-1 p-2">
                          
                          <div className="">
                            <select
                            value={menuCategoryId}
                            onChange={(e)=>changeCategory(e)}
                            className="w-full bg-transparent placeholder:text-slate-400 
                            text-[#006341] text-sm border 
                            border-[#006341] rounded pl-3 pr-8 py-2 transition duration-300 ease 
                            focus:outline-none focus:border-[#006341]
                            hover:border-[#006341]
                            shadow-sm focus:shadow-md appearance-none cursor-pointer">
                            <option >Choose a Category</option>
                            {
                              categories.map((data, index)=>{
                                return(
                                  <option key={data._id + index} value={data._id}>{data.name}</option>
                                )
                              })
                            }
                            </select>
                          </div>
                          {/* img */}
                          <div className="flex justify-center mt-2">
                            <div className=' ring-1 w-[200px] h-[200px] ring-[#006341] rounded relative ' >
                              {img ? (
                                
                                    <Image 
                                    src={img}
                                    quality={30}
                                    layout="fill"
                                    style={{ objectFit: "cover" , borderRadius: '5px' }}
                                    alt='' />
                                ) : ""
                              }
                            </div> 
                          </div>

                          <div className="flex justify-center mt-1">
                            <div className="me-1">
                              <label className="cursor-pointer text-[10px] border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200" htmlFor="file_input">
                                  Upload Img 
                              </label>
                              <input className=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                              hidden
                              " id="file_input" type="file"
                              accept="image/*" 
                              onChange={(e)=>menuFileUploadHandler(e)}
                              />

                            </div>
                            <div className="" > 
                              <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                              htmlFor="img_delete"
                              onClick={()=>menuDeleteImg()}
                              >
                                Delete
                              </label>
                            </div>
                          </div>


                          <div className="p-2 text-[#006341]">
                            <div className="flex justify-between text-sm  ">
                              <p className="w-[50px]">Name</p>
                              <p className="flex flex-1 ">
                                <input type="text"
                                value={menuName}
                                onChange={(e)=>menuNameOnChange(e)} 
                                className=" text-sm p-1 ps-2 w-full border border-[#006341] outline-none rounded" 
                                />
                              </p>
                            </div>

                            <div className="flex justify-between text-sm mt-1">
                              <p className="w-[50px]">Price</p>
                              <p className="flex flex-1 ">
                                <input type="text" 
                                value={menuPrice}
                                onChange={(e)=>menuPriceOnChange(e)} 
                                className="text-end text-sm p-1 ps-2 w-full border border-[#006341] outline-none rounded" 
                                />
                              </p>
                            </div>
                            
                            <div className="mt-2">
                              <p className="text-sm ">Description</p>
                              <p className="mt-1">
                                <textarea 
                                value={menuDescription}
                                onChange={(e)=>menuDescriptionOnChange(e)}
                                className="resize-none border w-full h-[90px] px-2 py-1 text-sm bg-slate-100
                                focus:border-[#006341] focus:bg-white text-[#006341] outline-none rounded"
                                ></textarea>
                              </p>
                            </div>
                            <div>
                              <p className="flex justify-end">
                                {
                                  (menuUpdateYn)?<ButtonCommentSave onClick={()=>menuUpdate()} name={"update"}/>
                                  :<ButtonCommentSave onClick={()=>menuSave()} name={"save"}/>
                                }
                              </p>
                            </div>
                            

                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :""
              }

              

              <div className="flex justify-end p-1 border border-white bg-[#739e8f] ">
                <p className="flex justify-center items-center mr-1">
                  <ButtonRefresh 
                  onClick={()=>mainSearch()}
                  />
                </p>
                <p><ButtonBase onClick={()=>save()} name={"SAVE"}/> </p>
              </div>
              
              {/* color component */}
              <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                
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

                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("2")} name={"Ca-BG-Color"}/>
                  </p> 
                  <div className={ colorBox2 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("2")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={cabgColorButton} setColor={setCabgColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={cabgColorButton} 
                        onChange={(e)=>caBgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>caBgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* category text */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("3")} name={"Ca-Text-Color"}/>
                  </p> 
                  <div className={ colorBox3 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("3")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={caTextColorButton} setColor={setCaTextColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={caTextColorButton} 
                        onChange={(e)=>caTextInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>caTextColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* category bordeer */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonSmall onClick={()=>colorBoxOpen("4")} name={"Ca-Border-Color"}/>
                  </p> 
                  <div className={ colorBox4 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("4")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={caBorderColorButton} setColor={setCaBorderColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={caBorderColorButton} 
                        onChange={(e)=>caBorderInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>caBorderColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>



              </div>
              {/* color component end */}
              
              {/* category start */}
              <div className="h-full border-t border-[#006341]">
                <div className="flex justify-between my-2">
                  <p></p>
                  <p className="font-bold text-[#006341]">Category</p>
                  <p className="mr-1 text-2xl mt-0.5 text-[#006341]  cursor-pointer "
                  onClick={()=>closeCategory()}
                  >
                    {
                      (categoryScreenYn)?<RiArrowDropUpLine />:<RiArrowDropDownLine/>
                    }
                    
                  </p>
                </div>
              </div>

              {
                (categoryScreenYn)?
                <div className="flex justify-center  ">
                <div className="grid grid-cols-1
                2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1
                ">
                  <div className="my-2 max-w-[300px] max-h-[180px] overflow-y-scroll border text-[#006341]">
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
                    <div className="grid grid-cols-1 text-[#006341] ">
                      <p className="mb-2 text-sm font-bold ">name
                        <input type="text" 
                        disabled={inputStatus}
                        className= 
                        {`text-sm font-normal
                        ms-2 border rounded outline-none ps-2 py-1 border-[#006341] `} 
                        onChange={(e)=>categoryOnChange(e)}
                        value={categoryName}/>
                      </p>
                      <p className="text-sm w-full font-bold flex justify-normal ">order
                        <input type="number" 
                        disabled={inputStatus}
                        className=
                        {`text-sm font-normal
                        ms-2 w-[40px] border rounded outline-none ps-2 py-0.5 border-[#006341] `} 
                        onChange={(e)=>orderOnChange(e)}
                        value={order}/>
                        
                        
                      </p>
                      <p className="flex justify-end pt-2">
                        {/* <button 
                        onClick={()=>newOnClick()}
                        className="border rounded px-1 text-sm">new</button> */}
                        <p className="me-1">
                          <ButtonCommentSave onClick={()=>newOnClick()} name={"new"}/>
                        </p>
                        {
                          (updateYn)?
                          <>
                          {/* <button 
                          onClick={()=>categoryUpdateOnClick()}
                          className="border rounded px-1 ms-1 text-sm">update</button> */}
                          <p className="me-1"><ButtonCommentSave onClick={()=>categoryUpdateOnClick()} name={"update"}/></p>
                          {/* <button 
                          onClick={()=>categoryDeleteOnClick()}
                          className="border rounded px-1 ms-1 text-sm">delete</button> */}
                          <p className="me-1"><ButtonCommentSave onClick={()=>categoryDeleteOnClick()} name={"delete"}/></p>
                          </>
                          :
                          // <button 
                          // onClick={()=>categorySaveOnClick()}
                          // className="border rounded px-1 ms-1 text-sm">save</button>
                          <p className="me-1"><ButtonCommentSave onClick={()=>categorySaveOnClick()} name={"save"}/></p>
                        }
                        
                        
                      </p>
                    </div>
                    <div className="flex justify-end border-t mt-2 pt-2">
                      {/* <button 
                      onClick={()=>menuOnClick()}
                      className="mt-2 border rounded px-1 text-sm">menu</button> */}
                      <ButtonCommentSave onClick={()=>menuOnClick()} name={"menu"}/>
                    </div>
                  </div>
                </div>


              </div>
              :""

              }

              
              {/* category end */}
              
              {/* menu start */}
              <div className={" h-[200vh] border p-1" } style={{backgroundColor:bgColor}}>

              <div className="flex justify-center  ">
                <div className="">
                  <select
                  onChange={(e)=>changeCategoryMenu(e)}
                  className="w-full bg-transparent placeholder:text-slate-400 
                  text-sm border 
                  border-[#006341] rounded pl-3 pr-8 py-2 transition duration-300 ease 
                  focus:outline-none 

                  shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  style={{
                    backgroundColor:cabgColor, 
                    color:caTextColor,
                    borderColor:caBorderColor, 
                  }}
                  >
                  <option value="">Choose a Category</option>
                  {
                    categories.map((data, index)=>{
                      return(
                        <option key={data._id + index} value={data._id}>{data.name}</option>
                      )
                    })
                  }
                  </select>
                </div>
              </div>

                <div className="flex flex-wrap p-10 ">
                  
                  {
                    menus.map((data, index)=>{
                      return(
                        <div key={data._id+index} >
                          <div className="mx-2" 
                            style={{
                            width:"300px", 
                            height:"400px", 
                            borderWidth:"2px",
                            backgroundColor:"red", 
                            borderRadius:"10px",
                            borderColor:"white"
                          }}>

                            
                            
                            <div className="w-full flex justify-center">
                              <div className=' ring-1 ring-[#006341] rounded relative '
                                  style={{width:"200px", height:"200px", borderWidth:"2px", borderColor:"white"}}
                              >
                                {data.img ? (
                                  
                                      <Image 
                                      src={data.img}
                                      quality={30}
                                      layout="fill"
                                      style={{ objectFit: "cover" , borderRadius: '5px' }}
                                      alt='' />
                                  ) : ""
                                }
                              </div>
                            </div> 

                            <div className="w-full mt-5">
                              <p className="flex justify-center ">
                                {data.name}
                              </p>
                              <p className="flex justify-center ">
                                {data.price}
                              </p>
                            </div>

                            <div className="mt-2">
                              <p className="mt-1 flex justify-center">
                                <textarea 
                                value={data.description}
                                disabled={true}
                                className="resize-none border-4 border-black h-[90px] w-[280px] px-2 py-1 text-sm bg-slate-100
                                focus:border-[#006341] focus:bg-white text-[#006341] outline-none rounded"
                                ></textarea>
                              </p>
                            </div>

                          </div>

                          <div className="flex justify-end m-2 ">
                            <p className="">
                              <ButtonCommentSave onClick={()=>menuUpdateScreen(data)} name={"update"}/>
                            </p>
                          </div>

                        </div>
                      )
                    })
                  }


                </div>
              </div>
            </div>
          }

          
        </div>
        :<LoginMove/>



      }
      
    </>
  );
};

export default Main