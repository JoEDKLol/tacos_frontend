'use client';

import ColorButton from "@/app/components/colorButton/ColorButton";
import { ButtonBase, ButtonCommentSave, ButtonRefresh, ButtonXSmall } from "@/app/components/common/buttonComponents/Button";
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
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

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


  const [bgColorButton, setBgColorButton] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("");  
  const [cabgColorButton, setCabgColorButton] = useState<string>("#ffffff"); 
  const [cabgColor, setCabgColor] = useState<string>("");  
  const [caTextColorButton, setCaTextColorButton] = useState<string>("#ffffff"); 
  const [caTextColor, setCaTextColor] = useState<string>(""); 
  const [caBorderColorButton, setCaBorderColorButton] = useState<string>("#ffffff"); 
  const [caBorderColor, setCaBorderColor] = useState<string>(""); 
  const [menuBgColorButton, setMenuBgColorButton] = useState<string>("#ffffff"); 
  const [menuBgColor, setMenuBgColor] = useState<string>(""); 
  const [menuBorderColorButton, setMenuBorderColorButton] = useState<string>("#ffffff"); 
  const [menuBorderColor, setMenuBorderColor] = useState<string>(""); 
  const [menuNameColorButton, setMenuNameColorButton] = useState<string>("#ffffff"); 
  const [menuNameColor, setMenuNameColor] = useState<string>(""); 
  const [menuPriceColorButton, setMenuPriceColorButton] = useState<string>("#ffffff"); 
  const [menuPriceColor, setMenuPriceColor] = useState<string>("");
  const [menuDesColorButton, setMenuDesColorButton] = useState<string>("#ffffff"); 
  const [menuDesColor, setMenuDesColor] = useState<string>("");
  const [menuDesBgColorButton, setMenuDesBgColorButton] = useState<string>("#ffffff"); 
  const [menuDesBgColor, setMenuDesBgColor] = useState<string>("");
  const [menuDesBdColorButton, setMenuDesBdColorButton] = useState<string>("#ffffff"); 
  const [menuDesBdColor, setMenuBdBgColor] = useState<string>("");
  const [menuImgBdColorButton, setMenuImgBdColorButton] = useState<string>("#ffffff"); 
  const [menuImgBdBdColor, setMenuImgBdBgColor] = useState<string>(""); 

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
  const [colorBox11, setColorBox11] = useState<string>("hidden");
  const [colorBox12, setColorBox12] = useState<string>("hidden");


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
  const [colorScreenYn, setColorScreenYn] = useState<boolean>(true);
  const [sizeScreenYn, setSizeScreenYn] = useState<boolean>(true);

  // size
  const [categoryBoxHeight, setCategoryBoxHeight] = useState<string>("50");
  const [categoryBoxWidth, setCategoryBoxWidth] = useState<string>("200");
  const [categoryTextSize, setCategoryTextSize] = useState<string>("15");
  const [categoryBorderSize, setCategoryBorderSize] = useState<string>("1");
  const [categoryBorderRadius, setCategoryBorderRadius] = useState<string>("10");
  const [categoryMarginTop, setCategoryMarginTop] = useState<string>("0");

  const [menuBoxHeight, setmenuBoxHeight] = useState<string>("400");
  const [menuBoxWidth, setmenuBoxWidth] = useState<string>("300");
  const [menuBoxBorderSize, setMenuBoxBorderSize] = useState<string>("1");
  const [menuBoxMarginTop, setmenuBoxMarginTop] = useState<string>("10");
  const [menuBoxMarginLeft, setmenuBoxMarginLeft] = useState<string>("10");
  const [menuBoxRadius, setMenuBoxRadius] = useState<string>("10");

  const [imgBoxHeight, setImgBoxHeight] = useState<string>("200");
  const [imgBoxWidth, setImgBoxWidth] = useState<string>("200");
  const [imgBorderSize, setImgBorderSize] = useState<string>("1");
  const [imgBoxRadius, setImgBoxRadius] = useState<string>("10");
  const [imgBoxMarginTop, setImgBoxMarginTop] = useState<string>("0");

  const [menuNameTextSize, setMenuNameTextSize] = useState<string>("15");
  const [menuPriceTextSize, setMenuPriceTextSize] = useState<string>("15");
  const [menuDesTextSize, setMenuDesTextSize] = useState<string>("15");
  const [menuNameFontWeight, setMenuNameFontWeight] = useState<string>("normal");
  const [menuPriceFontWeight, setMenuPriceFontWeight] = useState<string>("normal");
  const [menuDesFontWeight, setMenuDesFontWeight] = useState<string>("normal");
  const [menuNameMarginTop, setMenuNameMarginTop] = useState<string>("0");
  const [menuPriceMarginTop, setMenuPriceMarginTop] = useState<string>("0");
  const [menuDesMarginTop, setMenuDesMarginTop] = useState<string>("0");

  const [menuDesBoxHeight, setMenuDesBoxHeight] = useState<string>("100");
  const [menuDesBoxWidth, setMenuDesBoxWidth] = useState<string>("280");
  const [menuDesBoxBorderSize, setMenuDesBoxBorderSize] = useState<string>("1");
  const [menuDesBoxRadius, setMenuDesBoxRadius] = useState<string>("10");

  
  
  

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

  function manuBgInputOnchage(e:any){
    setMenuBgColorButton(e.target.value)
  }

  function manuBgColorApply(){
    setMenuBgColor(menuBgColorButton);
  }

  function manuBorderInputOnchage(e:any){
    setMenuBorderColorButton(e.target.value)
  }

  function manuBorderColorApply(){
    setMenuBorderColor(menuBorderColorButton);
  }

  function manuNameInputOnchage(e:any){
    setMenuNameColorButton(e.target.value)
  }

  function manuNameColorApply(){
    setMenuNameColor(menuNameColorButton);
  }

  function manuPriceInputOnchage(e:any){
    setMenuPriceColorButton(e.target.value)
  }

  function manuPriceColorApply(){
    setMenuPriceColor(menuPriceColorButton);
  }

  function manuDesInputOnchage(e:any){
    setMenuDesColorButton(e.target.value)
  }

  function manuDesColorApply(){
    setMenuDesColor(menuDesColorButton);
  }

  function manuDesBgInputOnchage(e:any){
    setMenuDesBgColorButton(e.target.value)
  }

  function manuDesBgColorApply(){
    setMenuDesBgColor(menuDesBgColorButton);
  }

  function manuDesBdInputOnchage(e:any){
    setMenuDesBdColorButton(e.target.value)
  }

  function manuDesBdColorApply(){
    setMenuBdBgColor(menuDesBdColorButton);
  }

  function manuImgBdInputOnchage(e:any){
    setMenuImgBdColorButton(e.target.value)
  }

  function manuImgBdColorApply(){
    setMenuImgBdBgColor(menuImgBdColorButton);
  }

// color end
  

  async function save(){
    const obj = {
      userseq : userStateSet.userseq, 
      email : userStateSet.email,
      restaurantname : restaurantName, 
      menu : {
        bgColor:bgColor, 
        cabgColor:cabgColor, 
        caTextColor:caTextColor, 
        caBorderColor:caBorderColor, 
        menuBgColor:menuBgColor, 
        menuBorderColor:menuBorderColor, 
        menuNameColor:menuNameColor, 
        menuPriceColor:menuPriceColor, 
        menuDesColor:menuDesColor, 
        menuDesBgColor:menuDesBgColor, 
        menuDesBdColor:menuDesBdColor, 
        menuImgBdBdColor:menuImgBdBdColor, 
        categoryBoxHeight:categoryBoxHeight, 
        categoryBoxWidth:categoryBoxWidth, 
        categoryTextSize:categoryTextSize, 
        categoryBorderSize:categoryBorderSize, 
        categoryBorderRadius:categoryBorderRadius, 
        categoryMarginTop:categoryMarginTop, 
        menuBoxHeight:menuBoxHeight, 
        menuBoxWidth:menuBoxWidth, 
        menuBoxBorderSize:menuBoxBorderSize, 
        menuBoxMarginTop:menuBoxMarginTop, 
        menuBoxMarginLeft:menuBoxMarginLeft, 
        menuBoxRadius:menuBoxRadius, 
        imgBoxHeight:imgBoxHeight, 
        imgBoxWidth:imgBoxWidth, 
        imgBorderSize:imgBorderSize, 
        imgBoxRadius:imgBoxRadius, 
        imgBoxMarginTop:imgBoxMarginTop, 
        menuNameTextSize:menuNameTextSize, 
        menuPriceTextSize:menuPriceTextSize, 
        menuDesTextSize:menuDesTextSize, 
        menuNameFontWeight:menuNameFontWeight, 
        menuPriceFontWeight:menuPriceFontWeight, 
        menuDesFontWeight:menuDesFontWeight, 
        menuNameMarginTop:menuNameMarginTop, 
        menuPriceMarginTop:menuPriceMarginTop, 
        menuDesMarginTop:menuDesMarginTop, 
        menuDesBoxHeight:menuDesBoxHeight, 
        menuDesBoxWidth:menuDesBoxWidth, 
        menuDesBoxBorderSize:menuDesBoxBorderSize, 
        menuDesBoxRadius:menuDesBoxRadius, 
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
    if(colorBoxNum === "11") setColorBox11("hidden");
    if(colorBoxNum === "12") setColorBox12("hidden");

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
    if(colorBoxNum === "11") setColorBox11("block");
    if(colorBoxNum === "12") setColorBox12("block");
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
    // console.log(retObj);
    if(retObj.sendObj.success === "y"){
      if(retObj.sendObj.resObj.menu){
        setLayOut(retObj.sendObj.resObj.menu);
      }else{
        setLayOut(
          {
            bgColorButton:"#ffffff",
            bgColor:"#ffffff",
            cabgColorButton:"#ffffff",
            cabgColor:"#ffffff",
            caTextColorButton:"#000000",
            caTextColor:"#000000",
            caBorderColorButton:"#000000",
            caBorderColor:"#000000",
            menuBgColorButton:"#ffffff",
            menuBgColor:"#ffffff",
            menuBorderColorButton:"#000000",
            menuBorderColor:"#000000",
            menuNameColorButton:"#000000",
            menuNameColor:"#000000",
            menuPriceColorButton:"#000000",
            menuPriceColor:"#000000",
            menuDesColorButton:"#000000",
            menuDesColor:"#000000",
            menuDesBgColorButton:"#ffffff",
            menuDesBgColor:"#ffffff",
            menuDesBdColorButton:"#000000",
            menuDesBdColor:"#000000",
            menuImgBdColorButton:"#000000",
            menuImgBdBdColor:"#000000",
            categoryBoxHeight:"50", 
            categoryBoxWidth:"200",
            categoryTextSize:"15",
            categoryBorderSize:"1",
            categoryBorderRadius:"10",
            categoryMarginTop:"0",
            menuBoxHeight:"400",
            menuBoxWidth:"300",
            menuBoxBorderSize:"1",
            menuBoxMarginTop:"10",
            menuBoxMarginLeft:"10",
            menuBoxRadius:"10",
            imgBoxHeight:"200",
            imgBoxWidth:"200",
            imgBorderSize:"1",
            imgBoxRadius:"10",
            imgBoxMarginTop:"0",
            menuNameTextSize:"15",
            menuPriceTextSize:"15",
            menuDesTextSize:"15",
            menuNameFontWeight:"normal",
            menuPriceFontWeight:"normal",
            menuDesFontWeight:"normal",
            menuNameMarginTop:"0",
            menuPriceMarginTop:"0",
            menuDesMarginTop:"0",
            menuDesBoxHeight:"100",
            menuDesBoxWidth:"280",
            menuDesBoxBorderSize:"1",
            menuDesBoxRadius:"10",


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
    setCabgColorButton(layOutObj.cabgColor);
    setCabgColor(layOutObj.cabgColor);
    setCaTextColorButton(layOutObj.caTextColor); 
    setCaTextColor(layOutObj.caTextColor);
    setCaBorderColorButton(layOutObj.caBorderColor); 
    setCaBorderColor(layOutObj.caBorderColor);
    setMenuBgColorButton(layOutObj.menuBgColor); 
    setMenuBgColor(layOutObj.menuBgColor);
    setMenuBorderColorButton(layOutObj.menuBorderColor); 
    setMenuBorderColor(layOutObj.menuBorderColor);
    setMenuNameColorButton(layOutObj.menuNameColor); 
    setMenuNameColor(layOutObj.menuNameColor);
    setMenuPriceColorButton(layOutObj.menuPriceColor); 
    setMenuPriceColor(layOutObj.menuPriceColor);
    setMenuDesColorButton(layOutObj.menuDesColor) 
    setMenuDesColor(layOutObj.menuDesColor)
    setMenuDesBgColorButton(layOutObj.menuDesBgColor); 
    setMenuDesBgColor(layOutObj.menuDesBgColor);
    setMenuDesBdColorButton(layOutObj.menuDesBdColor); 
    setMenuBdBgColor(layOutObj.menuDesBdColor);
    setMenuImgBdColorButton(layOutObj.menuImgBdBdColor); 
    setMenuImgBdBgColor(layOutObj.menuImgBdBdColor);

    setCategoryBoxHeight(layOutObj.categoryBoxHeight);
    setCategoryBoxWidth(layOutObj.categoryBoxWidth);
    setCategoryTextSize(layOutObj.categoryTextSize);
    setCategoryBorderSize(layOutObj.categoryBorderSize);
    setCategoryBorderRadius(layOutObj.categoryBorderRadius);
    setCategoryMarginTop(layOutObj.categoryMarginTop);
    setmenuBoxHeight(layOutObj.menuBoxHeight);
    setmenuBoxWidth(layOutObj.menuBoxWidth);
    setMenuBoxBorderSize(layOutObj.menuBoxBorderSize);
    setmenuBoxMarginTop(layOutObj.menuBoxMarginTop);
    setmenuBoxMarginLeft(layOutObj.menuBoxMarginLeft);
    setMenuBoxRadius(layOutObj.menuBoxRadius);
    setImgBoxHeight(layOutObj.imgBoxHeight);
    setImgBoxWidth(layOutObj.imgBoxWidth);
    setImgBorderSize(layOutObj.imgBorderSize);
    setImgBoxRadius(layOutObj.imgBoxRadius);
    setImgBoxMarginTop(layOutObj.imgBoxMarginTop);
    setMenuNameTextSize(layOutObj.menuNameTextSize);
    setMenuPriceTextSize(layOutObj.menuPriceTextSize);
    setMenuDesTextSize(layOutObj.menuDesTextSize);
    setMenuNameFontWeight(layOutObj.menuNameFontWeight);
    setMenuPriceFontWeight(layOutObj.menuPriceFontWeight);
    setMenuDesFontWeight(layOutObj.menuDesFontWeight);
    setMenuNameMarginTop(layOutObj.menuNameMarginTop);
    setMenuPriceMarginTop(layOutObj.menuPriceMarginTop);
    setMenuDesMarginTop(layOutObj.menuDesMarginTop);
    setMenuDesBoxHeight(layOutObj.menuDesBoxHeight);
    setMenuDesBoxWidth(layOutObj.menuDesBoxWidth);
    setMenuDesBoxBorderSize(layOutObj.menuDesBoxBorderSize);
    setMenuDesBoxRadius(layOutObj.menuDesBoxRadius);
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

  function closeColor(){
    setColorScreenYn(!colorScreenYn);
  }

  function closeSize(){
    setSizeScreenYn(!sizeScreenYn);
  }

  function categoryBoxSize(type:string){

    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(categoryBoxHeight);
      numSize = numSize + 3;
      setCategoryBoxHeight(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(categoryBoxHeight);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setCategoryBoxHeight(numSize + "");
    }else if(type === "widthDown"){
      numSize = Number(categoryBoxWidth);
      numSize = numSize + 3;
      setCategoryBoxWidth(numSize + "");
    }else if(type === "widthUp"){
      numSize = Number(categoryBoxWidth);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setCategoryBoxWidth(numSize + "");
    }
  }

  function categoryText(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(categoryTextSize);
      numSize = numSize + 1;
      setCategoryTextSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(categoryTextSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setCategoryTextSize(numSize + "");
    }
  }

  function categoryBorder(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(categoryBorderSize);
      numSize = numSize + 1;
      setCategoryBorderSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(categoryBorderSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setCategoryBorderSize(numSize + "");
    }
  }

  function categoryRadius(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(categoryBorderRadius);
      numSize = numSize + 2;
      setCategoryBorderRadius(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(categoryBorderRadius);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setCategoryBorderRadius(numSize + "");
    }
  }

  function categoryMaginTop(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(categoryMarginTop);
      numSize = numSize + 2;
      setCategoryMarginTop(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(categoryMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setCategoryMarginTop(numSize + "");
    }
  }

  function menuBoxSize(type:string){

    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(menuBoxHeight);
      numSize = numSize + 3;
      setmenuBoxHeight(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(menuBoxHeight);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setmenuBoxHeight(numSize + "");
    }else if(type === "widthDown"){
      numSize = Number(menuBoxWidth);
      numSize = numSize + 3;
      setmenuBoxWidth(numSize + "");
    }else if(type === "widthUp"){
      numSize = Number(menuBoxWidth);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setmenuBoxWidth(numSize + "");
    }
  }

  
  function imgBoxSize(type:string){

    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(imgBoxHeight);
      numSize = numSize + 3;
      setImgBoxHeight(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(imgBoxHeight);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setImgBoxHeight(numSize + "");
    }else if(type === "widthDown"){
      numSize = Number(imgBoxWidth);
      numSize = numSize + 3;
      setImgBoxWidth(numSize + "");
    }else if(type === "widthUp"){
      numSize = Number(imgBoxWidth);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setImgBoxWidth(numSize + "");
    }
  }

  function menuBoxBorder(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuBoxBorderSize);
      numSize = numSize + 1;
      setMenuBoxBorderSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuBoxBorderSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setMenuBoxBorderSize(numSize + "");
    }
  }

  function menuBoxLocation(type:string){
    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(menuBoxMarginTop);
      numSize = numSize + 2;
      setmenuBoxMarginTop(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(menuBoxMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setmenuBoxMarginTop(numSize + "");
    }else if(type === "widthDown"){
      numSize = Number(menuBoxMarginLeft);
      numSize = numSize + 2;
      setmenuBoxMarginLeft(numSize + "");
    }else if(type === "widthUp"){
      numSize = Number(menuBoxMarginLeft);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setmenuBoxMarginLeft(numSize + "");
    }
  }

  function menuBoxRadiusSize(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuBoxRadius);
      numSize = numSize + 2;
      setMenuBoxRadius(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuBoxRadius);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setMenuBoxRadius(numSize + "");
    }
  }

  function imgBoxBdSize(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(imgBorderSize);
      numSize = numSize + 1;
      setImgBorderSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(imgBorderSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setImgBorderSize(numSize + "");
    }
  }

  function imgBoxRadiusSize(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(imgBoxRadius);
      numSize = numSize + 2;
      setImgBoxRadius(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(imgBoxRadius);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setImgBoxRadius(numSize + "");
    }
  }

  function imgBoxLocation(type:string){
    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(imgBoxMarginTop);
      numSize = numSize + 2;
      setImgBoxMarginTop(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(imgBoxMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setImgBoxMarginTop(numSize + "");
    }
  }

  function menuNameText(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuNameTextSize);
      numSize = numSize + 1;
      setMenuNameTextSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuNameTextSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setMenuNameTextSize(numSize + "");
    }
  }

  function menuPriceText(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuPriceTextSize);
      numSize = numSize + 1;
      setMenuPriceTextSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuPriceTextSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setMenuPriceTextSize(numSize + "");
    }
  }

  function menuDesText(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuDesTextSize);
      numSize = numSize + 1;
      setMenuDesTextSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuDesTextSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setMenuDesTextSize(numSize + "");
    }
  }

  function menuNameFW(){
    if(menuNameFontWeight === "normal"){
      setMenuNameFontWeight("bold");
    }else{
      setMenuNameFontWeight("normal");
    }
  }

  function menuPriceFW(){
    if(menuPriceFontWeight === "normal"){
      setMenuPriceFontWeight("bold");
    }else{
      setMenuPriceFontWeight("normal");
    }
  }

  function menuDesFW(){
    if(menuDesFontWeight === "normal"){
      setMenuDesFontWeight("bold");
    }else{
      setMenuDesFontWeight("normal");
    }
  }

  function menuNameTextLocation(type:string){
    let numSize = 0;
    
    if(type === "sizeUp"){
      numSize = Number(menuNameMarginTop);
      numSize = numSize + 2;
      setMenuNameMarginTop(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuNameMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setMenuNameMarginTop(numSize + "");
    }
  }

  function menuPriceTextLocation(type:string){
    let numSize = 0;
    
    if(type === "sizeUp"){
      numSize = Number(menuPriceMarginTop);
      numSize = numSize + 2;
      setMenuPriceMarginTop(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuPriceMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setMenuPriceMarginTop(numSize + "");
    }
  }

  function menuDesTextLocation(type:string){
    let numSize = 0;
    
    if(type === "sizeUp"){
      numSize = Number(menuDesMarginTop);
      numSize = numSize + 2;
      setMenuDesMarginTop(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuDesMarginTop);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setMenuDesMarginTop(numSize + "");
    }
  }

  function menuDesBoxSize(type:string){
    let numSize = 0;
    
    if(type === "heightUp"){
      numSize = Number(menuDesBoxHeight);
      numSize = numSize + 3;
      setMenuDesBoxHeight(numSize + "");
    }else if(type === "heightDown"){
      numSize = Number(menuDesBoxHeight);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setMenuDesBoxHeight(numSize + "");
    }else if(type === "widthDown"){
      numSize = Number(menuDesBoxWidth);
      numSize = numSize + 3;
      setMenuDesBoxWidth(numSize + "");
    }else if(type === "widthUp"){
      numSize = Number(menuDesBoxWidth);
      numSize = numSize - 3;
      if(numSize < 0) return;
      setMenuDesBoxWidth(numSize + "");
    }
  }

  function menuDesBoxBdSize(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuDesBoxBorderSize);
      numSize = numSize + 1;
      setMenuDesBoxBorderSize(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuDesBoxBorderSize);
      numSize = numSize - 1;
      if(numSize < 0) return;
      setMenuDesBoxBorderSize(numSize + "");
    }
  }

  function menuDesBoxRadiusSize(type:string){
    let numSize = 0;
    if(type === "sizeUp"){
      numSize = Number(menuDesBoxRadius);
      numSize = numSize + 2;
      setMenuDesBoxRadius(numSize + "");
    }else if(type === "sizeDown"){
      numSize = Number(menuDesBoxRadius);
      numSize = numSize - 2;
      if(numSize < 0) return;
      setMenuDesBoxRadius(numSize + "");
    }
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

              {/* category start */}
              <div className="h-full border-t border-[#006341]">
                <div className="flex justify-between my-2">
                  <p></p>
                  <p className="font-bold text-[#006341]">Color</p>
                  <p className="mr-1 text-2xl mt-0.5 text-[#006341]  cursor-pointer "
                  onClick={()=>closeColor()}
                  >
                    {
                      (colorScreenYn)?<RiArrowDropUpLine />:<RiArrowDropDownLine/>
                    }
                    
                  </p>
                </div>
              </div>
              
              {/* color component */}
              {
                (colorScreenYn)?
                <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("1")} name={"BG-Color"}/>
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
                    <ButtonXSmall onClick={()=>colorBoxOpen("2")} name={"Ca-BG-Color"}/>
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
                    <ButtonXSmall onClick={()=>colorBoxOpen("3")} name={"Ca-Text-Color"}/>
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
                    <ButtonXSmall onClick={()=>colorBoxOpen("4")} name={"Ca-Border-Color"}/>
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

                {/* menu bg */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("5")} name={"Menu-Bg-Color"}/>
                  </p> 
                  <div className={ colorBox5 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("5")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuBgColorButton} setColor={setMenuBgColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBgColorButton} 
                        onChange={(e)=>manuBgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuBgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu border */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("6")} name={"Menu-Border-Color"}/>
                  </p> 
                  <div className={ colorBox6 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("6")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuBorderColorButton} setColor={setMenuBorderColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuBorderColorButton} 
                        onChange={(e)=>manuBorderInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuBorderColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu name */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("7")} name={"Menu-Name-Color"}/>
                  </p> 
                  <div className={ colorBox7 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("7")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuNameColorButton} setColor={setMenuNameColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuNameColorButton} 
                        onChange={(e)=>manuNameInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuNameColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu price */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("8")} name={"Menu-Price-Color"}/>
                  </p> 
                  <div className={ colorBox8 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("8")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuPriceColorButton} setColor={setMenuPriceColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuPriceColorButton} 
                        onChange={(e)=>manuPriceInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuPriceColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu description */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("9")} name={"Menu-Des-Color"}/>
                  </p> 
                  <div className={ colorBox9 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("9")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuDesColorButton} setColor={setMenuDesColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuDesColorButton} 
                        onChange={(e)=>manuDesInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuDesColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu description Bg */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("10")} name={"Menu-Des-Bg-Color"}/>
                  </p> 
                  <div className={ colorBox10 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("10")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuDesBgColorButton} setColor={setMenuDesBgColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuDesBgColorButton} 
                        onChange={(e)=>manuDesBgInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuDesBgColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                {/* menu description Border */}
                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("11")} name={"Menu-Des-Bd-Color"}/>
                  </p> 
                  <div className={ colorBox11 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("11")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuDesBdColorButton} setColor={setMenuDesBdColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuDesBdColorButton} 
                        onChange={(e)=>manuDesBdInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuDesBdColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

                <div className="relative w-[150px] ">
                  <p className="flex justify-center my-1 w-[100%] ">
                    <ButtonXSmall onClick={()=>colorBoxOpen("12")} name={"Menu-Img-Bd-Color"}/>
                  </p> 
                  <div className={ colorBox12 +  " absolute z-10 bg-white border-4 rounded-lg w-full border-[#006341]"}>
                    <div className="flex justify-end bg-[#006341]" >
                      <p 
                      onClick={()=>colorBoxClose("12")}
                      className="mb-1 me-1 text-white cursor-pointer"><CgCloseR /></p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <ColorButton color={menuImgBdColorButton} setColor={setMenuImgBdColorButton}/>
                    </div> 
                    <div className="flex justify-center">
                      <p className="m-1 flex justify-between w-full">
                        <input className="text-sm p-1 ps-2 w-[90px] border border-[#006341] outline-none rounded" value={menuImgBdColorButton} 
                        onChange={(e)=>manuImgBdInputOnchage(e)}
                        />
                        <button className="text-xs w-[30%] border border-[#006341] bg-white text-[#006341] hover:bg-[#006341] hover:text-white font-bold py-1 rounded"
                        onClick={()=>manuImgBdColorApply()}
                        >
                        Apply
                        </button>
                      </p>
                    </div> 
                  </div>
                </div>

              </div>:""
              }
              {/* color component end */}

              {/* size start */}
              <div className="h-full border-t border-[#006341]">
                <div className="flex justify-between my-2">
                  <p></p>
                  <p className="font-bold text-[#006341]">Size</p>
                  <p className="mr-1 text-2xl mt-0.5 text-[#006341]  cursor-pointer "
                  onClick={()=>closeSize()}
                  >
                    {
                      (sizeScreenYn)?<RiArrowDropUpLine />:<RiArrowDropDownLine/>
                    }
                    
                  </p>
                </div>
              </div>

              {
                (sizeScreenYn)?
                <div className=" mt-2 mb-2 grid place-items-center grid-cols-2 z-0
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
                ">
                  <div className=" border p-2 border-black rounded w-[170px] h-[270px] mt-1 ">
                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Category-Box-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryBoxSize("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>categoryBoxSize("heightDown")}
                      ><IoIosArrowDown/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryBoxSize("widthUp")}
                      ><IoIosArrowBack/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>categoryBoxSize("widthDown")}
                      ><IoIosArrowForward/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Category-Text-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryText("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>categoryText("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Category-Border-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryBorder("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>categoryBorder("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Ca-Border-Radius</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryRadius("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>categoryRadius("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Category-Location</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>categoryMaginTop("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>categoryMaginTop("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                  </div>

                  <div className=" border p-2 border-black rounded w-[170px] h-[270px] mt-1 ">
                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Box-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxSize("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxSize("heightDown")}
                      ><IoIosArrowDown/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxSize("widthUp")}
                      ><IoIosArrowBack/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxSize("widthDown")}
                      ><IoIosArrowForward/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Box-Bd-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxBorder("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxBorder("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Box-Location</p>
                    <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxLocation("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxLocation("heightDown")}
                      ><IoIosArrowDown/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxLocation("widthUp")}
                      ><IoIosArrowBack/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxLocation("widthDown")}
                      ><IoIosArrowForward/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Box-Radius</p>
                    <div className="flex justify-center pb-1">
                    <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuBoxRadiusSize("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuBoxRadiusSize("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Img-Box-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>imgBoxSize("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>imgBoxSize("heightDown")}
                      ><IoIosArrowDown/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>imgBoxSize("widthUp")}
                      ><IoIosArrowBack/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>imgBoxSize("widthDown")}
                      ><IoIosArrowForward/></button>
                    </div>

                    

                  </div>

                  <div className=" border p-2 border-black rounded w-[170px] h-[270px] mt-1 ">
                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Img-Box-Bd-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>imgBoxBdSize("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>imgBoxBdSize("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Img-Box-Radius</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>imgBoxRadiusSize("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>imgBoxRadiusSize("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Img-Box-Location</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>imgBoxLocation("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>imgBoxLocation("heightDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Name-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuNameText("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuNameText("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Price-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuPriceText("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuPriceText("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>
                  </div>

                  <div className=" border p-2 border-black rounded w-[170px] h-[270px] mt-1 ">

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesText("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesText("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Name-Weight</p>
                    <div className="flex justify-center pb-1">
                      <button className=" px-1 rounded cursor-pointer text-sm hover:text-base border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuNameFW()}
                      >Bold</button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Price-Weight</p>
                    <div className="flex justify-center pb-1">
                      <button className=" px-1 rounded cursor-pointer text-sm hover:text-base border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuPriceFW()}
                      >Bold</button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Weight</p>
                    <div className="flex justify-center pb-1">
                      <button className=" px-1 rounded cursor-pointer text-sm hover:text-base border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesFW()}
                      >Bold</button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Name-Location</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuNameTextLocation("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuNameTextLocation("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                  </div>

                  <div className=" border p-2 border-black rounded w-[170px] h-[270px] mt-1 ">

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Price-Location</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuPriceTextLocation("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuPriceTextLocation("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Location</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesTextLocation("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesTextLocation("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesBoxSize("heightUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesBoxSize("heightDown")}
                      ><IoIosArrowDown/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white mr-1 text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesBoxSize("widthUp")}
                      ><IoIosArrowBack/></button>
                      <button className=" text-[20px] hover:text-[25px] bg-white text-[#006341] cursor-pointer border border-black rounded " style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesBoxSize("widthDown")}
                      ><IoIosArrowForward/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Bd-Size</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesBoxBdSize("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesBoxBdSize("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>

                    <p className="flex font-bold justify-center text-sm text-[#006341] border-b border-[#006341] mb-1">Menu-Des-Box-Radius</p>
                    <div className="flex justify-center pb-1">
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}} 
                      onClick={()=>menuDesBoxRadiusSize("sizeUp")}
                      ><IoIosArrowUp/></button>
                      <button className=" rounded cursor-pointer text-[20px] hover:text-[25px] border border-[#006341] bg-white text-[#006341] mr-1" style={{ fontWeight:"bold"}}
                      onClick={()=>menuDesBoxRadiusSize("sizeDown")}
                      ><IoIosArrowDown/></button>
                    </div>


                  </div>

                  

                  


                </div>
                :""
              }
              {/* size end */}
              
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
                      <div className="mb-2 text-sm font-bold ">name
                        <input type="text" 
                        disabled={inputStatus}
                        className= 
                        {`text-sm font-normal
                        ms-2 border rounded outline-none ps-2 py-1 border-[#006341] `} 
                        onChange={(e)=>categoryOnChange(e)}
                        value={categoryName}/>
                      </div>
                      <div className="text-sm w-full font-bold flex justify-normal ">order
                        <input type="number" 
                        disabled={inputStatus}
                        className=
                        {`text-sm font-normal
                        ms-2 w-[40px] border rounded outline-none ps-2 py-0.5 border-[#006341] `} 
                        onChange={(e)=>orderOnChange(e)}
                        value={order}/>
                        
                        
                      </div>
                      <div className="flex justify-end pt-2">
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
                        
                        
                      </div>
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
              <div className={" h-[100%] border p-1" } style={{backgroundColor:bgColor}}>

                <div className="flex justify-center  ">
                  <div className=""
                    style={{
                      marginTop:categoryMarginTop+"px"
                    }}
                  >
                    <select
                    onChange={(e)=>changeCategoryMenu(e)}
                    className="w-full bg-transparent placeholder:text-slate-400 
                    pl-3 pr-8 py-2 transition duration-300 ease 
                    focus:outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundColor:cabgColor, 
                      color:caTextColor,
                      borderColor:caBorderColor,
                      height:categoryBoxHeight + "px",
                      width:categoryBoxWidth  + "px",
                      fontSize:categoryTextSize + "px",
                      borderWidth:categoryBorderSize + "px",
                      borderRadius:categoryBorderRadius + "px"
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

                <div className="grid grid-cols-1 justify-center
                2xl:flex  xl:flex  lg:flex  md:flex  sm:grid
                2xl:flex-wrap  xl:flex-wrap  lg:flex-wrap  md:flex-wrap  sm:grid-cols-1  "
                style={{
                  marginTop:menuBoxMarginTop+"px",
                  marginLeft:menuBoxMarginLeft+"px",
                  marginRight:menuBoxMarginLeft+"px",
                }}
                >
                  
                  {
                    menus.map((data, index)=>{
                      return(
                        <div key={data._id+index} >
                          <div className="mx-5" 
                            style={{
                            width:menuBoxWidth + "px", 
                            height:menuBoxHeight + "px", 
                            borderWidth:menuBoxBorderSize + "px",
                            backgroundColor:menuBgColor,
                            borderColor:menuBorderColor, 
                            borderRadius:menuBoxRadius + "px"
                          }}>

                            
                            
                            <div className="w-full flex justify-center">
                              <div className=' rounded relative '
                                style={{
                                  width:imgBoxWidth+"px", 
                                  height:imgBoxHeight+"px", 
                                  borderWidth:imgBorderSize + "px", 
                                  borderColor:menuImgBdBdColor, 
                                  borderRadius:imgBoxRadius + "px", 
                                  marginTop:imgBoxMarginTop+"px",
                                }}
                                  
                              >
                                {data.img ? (
                                  
                                      <Image 
                                      src={data.img}
                                      quality={30}
                                      layout="fill"
                                      style={{ objectFit: "cover" , borderRadius:imgBoxRadius + "px",  }}
                                      alt='' />
                                  ) : ""
                                }
                              </div>
                            </div> 

                            <div className="w-full " >
                              <p className="flex justify-center " 
                              style={{
                                color:menuNameColor, 
                                fontSize:menuNameTextSize + "px",
                                fontWeight:menuNameFontWeight,
                                marginTop:menuNameMarginTop + "px",
                                }}>
                                {data.name}
                              </p>
                              <p className="flex justify-center " 
                              style={{
                                color:menuPriceColor,
                                fontSize:menuPriceTextSize + "px",
                                fontWeight:menuPriceFontWeight,
                                marginTop:menuPriceMarginTop + "px",
                                }}>
                                {data.price}
                              </p>
                            </div>

                            <div className=""
                            style={{
                              marginTop:menuDesMarginTop + "px"
                            }}
                            >
                              <p className="mt-1 flex justify-center" >
                                <textarea 
                                value={data.description}
                                disabled={true}
                                style={{
                                  color:menuDesColor, backgroundColor:menuDesBgColor, borderColor:menuDesBdColor,
                                  fontSize:menuDesTextSize + "px",
                                  fontWeight:menuDesFontWeight,
                                  height:menuDesBoxHeight + "px",
                                  width:menuDesBoxWidth + "px", 
                                  borderWidth:menuDesBoxBorderSize + "px", 
                                  borderRadius:menuDesBoxRadius + "px", 

                                }}
                                className="resize-none  px-2 py-1 outline-none "
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