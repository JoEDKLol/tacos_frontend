'use client';

import { ButtonCommentSave, ButtonQRMove, ButtonSmall, ButtonSmallMove, ButtonSmallSettingMove, ButtonTag } from "@/app/components/common/buttonComponents/Button";
import LoginMove from "@/app/components/common/LoginMove";
// import GoogleMap3 from "@/app/components/googleMap/GoogleMap3";
// import GoogleMapPopup from "@/app/components/googleMap/googleMapPopup";
import CustomConfirm from "@/app/components/modals/CustomConfirm";
import GoogleMapPopup from "@/app/components/modals/GoogleMapPopup";
import errorScreenShow from "@/app/store/errorScreen";
import loadingScreenShow from "@/app/store/loadingScreen";
import userState from "@/app/store/user";
import { transactionAuth } from "@/app/utils/axiosAuth";
import { transactionFile } from "@/app/utils/axiosFile";
import { checkInputNull } from "@/app/utils/checkUserValidation";
import { getDate } from "@/app/utils/common";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";

interface restaurantList {
  userseq : number
  restaurantseq : number
  restaurantname : string
  address : string
  img : string
  thumbImg : string
  introduction : string
  errMsg : string
  hashTagList : string
  hashTagArr : [any]
  hashtagErrMsg : string
  latLng : object
}

interface restaurantLists extends Array<restaurantList>{}
 
interface commentList {
  _id:string,
  commentseq : number
  restaurantseq : number
  comment : string
  restaurantinfo : {
    restaurantname:string
  }
  regdate : string
  lastCommentSeq : number
}

interface commentLists extends Array<commentList>{}

interface likeList {
  _id:string,
  restaurantlikeseq : number
  userseq : number
  restaurantseq : number
  restaurantinfo : {
    restaurantname:string
  }
  regdate : string
  lastLikeSeq : number
}

interface likeLists extends Array<likeList>{}


const Main = () => {

  const userStateSet = userState();
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<restaurantLists>([]);
  const [regScreenYn, setRegScreenYn] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<any>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [latLng, setLatLng] = useState<object>({});
  

  const focusRestaurantName = useRef<HTMLInputElement>(null);
  const focusUserName = useRef<HTMLInputElement>(null);

  const focusRestaurantNameList = useRef<null[] | HTMLInputElement[]>([]);
  const [restaurantNameIndex, setRestaurantNameIndex] = useState<any>(-1);
  const [currentFocusRestaurantName, setCurrentFocusRestaurantName] = useState<boolean>(false);

  const focusRestaurantAddressList = useRef<null[] | HTMLInputElement[]>([]);
  const [restaurantAddressIndex, setRestaurantAddressIndex] = useState<any>(-1);
  const [currentFocusRestaurantAddress, setCurrentFocusRestaurantAddress] = useState<boolean>(false);

  const focusIntroductionList = useRef<null[] | HTMLInputElement[]>([]);
  const [introductionIndex, setIntroductionIndex] = useState<any>(-1);
  const [currentFocusIntroduction, setCurrentFocusIntroduction] = useState<boolean>(false);

  const focusHashTagList = useRef<null[] | HTMLInputElement[]>([]);
  const [hashIndex, setHashIndex] = useState<any>(-1);
  const [currentHashIndex, setCurrentCurrentHashIndex] = useState<boolean>(false);

  const [showCustomConfirmPortal, setShowCustomConfirmPortal] = useState<boolean>(false);

  const [hashtag, setHashtag] = useState<string>("");
  const [hashtagArr, setHashtagArr] = useState<Array<string>>([]);

  const [hashtagErrMsg, setHashtagErrMsg] = useState<string>("");

  const focusHashTag = useRef<HTMLInputElement>(null); 

  const [showGooglePortal, setShowGooglePortal] = useState(false);
  const [showGooglePortalList, setShowGooglePortalList] = useState(false);

  const [googleMapType, setGoogleMapType] = useState<string>("");
  const [mapSelectedRestaurantseq, setMapSelectedRestaurantseq] = useState<number>(0);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [tabLayOut1, setTabLaOyut1] = useState<string>(" text-[#006341] border-b-[#006341] ");
  const [tabLayOut2, setTabLaOyut2] = useState<string>(" hover:text-[#819e94] hover:border-[#819e94] ");

  const [userimg, setUserimg] = useState<string>("");
  const [userthumbImg, setUserthumbImg] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  
  const [comments, setComments] = useState<commentLists>([]);
  const [likes, setLikes] = useState<likeLists>([]);
  const [commentsCurrentSeq, setCommentsCurrentSeq] = useState<number>(0);
  const [likesCurrentSeq, setLikesCurrentSeq] = useState<number>(0);
  

  const [commentCnt, setCommentsCnt] = useState<number>(0);
  const [likesCnt, setLikesCnt] = useState<number>(0);

  const [selectedList, setSelectedList] = useState<number>(0);
  const [listLayOut1, setListLayOut1] = useState<string>(" text-[#006341] border-b-[#006341] ");
  const [listLayOut2, setListLayOut2] = useState<string>(" hover:text-[#819e94] hover:border-[#819e94] ");
  

  useEffect(()=>{
    //유저번호로 레스토랑 정보 조회해 온다. 
    searchRestaurantLists();
    searchUserInfo();
  },[userStateSet]);


  useEffect(()=>{
  
    if(currentFocusRestaurantName){
      focusRestaurantNameList.current[restaurantNameIndex]?.focus();
    }

    if(currentFocusRestaurantAddress){
      focusRestaurantAddressList.current[restaurantAddressIndex]?.focus();
    }

    if(currentFocusIntroduction){
      focusIntroductionList.current[introductionIndex]?.focus();
    }

    if(currentHashIndex){
      focusHashTagList.current[hashIndex]?.focus();
    }
  
  
  },[restaurant]); 

  
  useEffect(()=>{
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\_+┼<>@\#$%&\'\"\\\(\=]/gi; 
    let totalByte = 0;

    setRestaurantName(restaurantName.replaceAll(regExp, ""));

    for(let i =0; i < restaurantName.length; i++) {
      const currentByte = restaurantName.charCodeAt(i);
      
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setRestaurantName(restaurantName.substring(0, i));
        break;
      }
    }
  },[restaurantName]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < restaurantAddress.length; i++) {
      const currentByte = restaurantAddress.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 80){
        setRestaurantAddress(restaurantAddress.substring(0, i));
        break;
      }
    }
  },[restaurantAddress]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < introduction.length; i++) {
      const currentByte = introduction.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 200){
        setIntroduction(introduction.substring(0, i));
        break;
      }
    }
  },[introduction]);

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < hashtag.length; i++) {
      const currentByte = hashtag.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 20){
        setHashtag(hashtag.substring(0, i));
        break;
      }
    }
  },[hashtag]);

  

  const showCustomConfirmHandleModal = (showYn:boolean) => {
    setShowCustomConfirmPortal(showYn);
  };
  
  async function searchRestaurantLists(){
    
    if(userStateSet.userseq === 0){
      return;
    }
    
    const obj = {
      userseq:userStateSet.userseq
    }
    
    const retObj = await transactionAuth("get", "res/searchreslist", obj, "", false, true, screenShow, errorShow);
      
    if(retObj.sendObj.success==="y"){
      if(retObj.sendObj.resObj.length > 0){
        setRestaurant(retObj.sendObj.resObj);
      }else{
        setRestaurant([]);
      }
    }
  }

  function regScreenOnClick(){
    setRegScreenYn(!regScreenYn);
  }

  function restaurantNameOnChange(e:any){
    setRestaurantName(e.target.value)
  }

  function restaurantAddressOnChange(e:any){
    setRestaurantAddress(e.target.value)
  }
  

  function deleteImg(){
    resDeleteImg();
  }

  function eachDeleteImg(restaurantseq:any){

    // const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    // restaurant[choosenIndex].img = "";
    // restaurant[choosenIndex].thumbImg = "";
    // setRestaurant([...restaurant]);

    resEachDeleteImg(restaurantseq);
  
  
  }

  function init(){
    setRestaurantName("");
    setRestaurantAddress("");
    setImg("");
    setThumbImg("");
    setIntroduction("");
    setHashtagArr([]);
    
  }


  async function saveOnClick(){
    setErrMsg("");
    if(!checkInputNull(restaurantName)){
      setErrMsg("Please check RestaurantName.");
      focusRestaurantName.current?.focus();
      return;
    }
    const hashtagArrObj:any = []
    for(let i=0; i<hashtagArr.length; i++){
      const obj = {
        tagname : hashtagArr[i], 
        reguser:userStateSet.email, 
        upduser:userStateSet.email, 
      }
      hashtagArrObj.push(obj);
    }

    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email, 
      restaurantname:restaurantName,
      address:restaurantAddress,
      img: img, 
      thumbImg : thumbImg, 
      introduction : introduction, 
      hashtagArr : hashtagArrObj, 
      hashtags : hashtagArr, 
      latLng : latLng
    }
    const retObj = await transactionAuth("post", "res/restaurantnewsave", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      setRegScreenYn(false);
      init();
      searchRestaurantLists();
    }else{
      setErrMsg(retObj.sendObj.message);
      // focusRestaurantName.current?.focus();
    }
  }

  async function fileUploadHandler(e:any){

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
      const imgUploadRes = await transactionFile("res/fileUploadS3", compressedFile, {}, "", false, true, screenShow, errorShow);
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

  function eachRestaurantNameOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(true);
    setCurrentFocusRestaurantAddress(false);
    setCurrentFocusIntroduction(false);
    setCurrentCurrentHashIndex(false);
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].restaurantname = e.target.value;
    setRestaurantNameIndex(choosenIndex);
    setRestaurant([...restaurant]);
  }
  
  function eachRestaurantAddressOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(false);
    setCurrentFocusRestaurantAddress(true);
    setCurrentFocusIntroduction(false);
    setCurrentCurrentHashIndex(false);
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].address = e.target.value;

    let totalByte = 0;
    for(let i =0; i < restaurant[choosenIndex].address.length; i++) {
      const currentByte = restaurant[choosenIndex].address.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 80){
        restaurant[choosenIndex].address = restaurant[choosenIndex].address.substring(0, i);
        break;
      }
    }


    setRestaurantAddressIndex(choosenIndex);
    setRestaurant([...restaurant]);
  }

  function eachIntroductionOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(false);
    setCurrentFocusRestaurantAddress(false);
    setCurrentFocusIntroduction(true);
    setCurrentCurrentHashIndex(false);
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].introduction = e.target.value;

    let totalByte = 0;
    for(let i =0; i < restaurant[choosenIndex].introduction.length; i++) {
      const currentByte = restaurant[choosenIndex].introduction.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 200){
        restaurant[choosenIndex].introduction = restaurant[choosenIndex].introduction.substring(0, i);
        break;
      }
    }


    setIntroductionIndex(choosenIndex);
    setRestaurant([...restaurant]);

  }

  function eachHashtagOnChange(e:any, restaurantseq:any){
    setCurrentFocusRestaurantName(false);
    setCurrentFocusRestaurantAddress(false);
    setCurrentFocusIntroduction(false);
    setCurrentCurrentHashIndex(true)
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].hashTagList = e.target.value;

    let totalByte = 0;
    for(let i =0; i < restaurant[choosenIndex].hashTagList.length; i++) {
      const currentByte = restaurant[choosenIndex].hashTagList.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 20){
        restaurant[choosenIndex].hashTagList = restaurant[choosenIndex].hashTagList.substring(0, i);
        break;
      }
    }

    setHashIndex(choosenIndex);
    setRestaurant([...restaurant]);


  }

  async function eachFileUploadHandler(e:any, restaurantseq:any){

    // - 백앤드 이미지 저장 사용 temp 저장 후 url 반환 
      // - 저장 누르면 해당 temp 삭제 및 실제 저장
    // - 새로운 이미지 선택시 기존 temp 삭제 및 새로 temp 저장 
    // - 사이즈 조정 
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    const file = e.target.files[0]; 
    if(!file) return;
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      // maxWidthOrHeight: 500, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };

    try {

      const compressedFile = await imageCompression(file, options);
      
      const imgUploadRes = await transactionFile("res/fileUploadS3", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        // setImg(imgUploadRes.sendObj.resObj.img_url);
        // setThumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
        restaurant[choosenIndex].img = imgUploadRes.sendObj.resObj.img_url;
        restaurant[choosenIndex].thumbImg = imgUploadRes.sendObj.resObj.img_url;
        setRestaurant([...restaurant]);

      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {

      
    }

  }

  const [fName, setFName] = useState<string>("");
  const [params, setParams] = useState<any>([]);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  function setConfirmRes(res:boolean, parfName:string, parValues:any){
    
    if(res){
      if(parfName === "UPDATE"){  
        updateOnClick(parValues[0]);
      }else if(parfName === "DELETE"){
        deleteOnClick(parValues[0]);
      }else if(parfName === "SAVE"){
        saveOnClick();
      }else if(parfName === "IMGDELETE"){
        deleteImg();
      }else if(parfName === "EACHIMGDELETE"){
        eachDeleteImg(parValues[0]);
      }else if(parfName === "USERIMGDELETE"){
        userDeleteImg();
      }
      
      
    }
  }
  
  function confirmModal(parText:string, parfName:string, ...parValues:any){
    setConfirmMessage(parText);
    setFName(parfName);
    setParams(parValues);
    showCustomConfirmHandleModal(true);
  }

  async function updateOnClick(restaurantseq:any){
    
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);

    const hashTagArrList = restaurant[choosenIndex].hashTagArr;

    const hashtagArrObj:any = []
    for(let i=0; i<hashTagArrList.length; i++){
      const obj = {
        tagname : hashTagArrList[i], 
        restaurantseq : restaurantseq, 
        reguser:userStateSet.email, 
        upduser:userStateSet.email, 
      }
      hashtagArrObj.push(obj);
    }

    const obj = {
      restaurantseq:restaurantseq,
      userseq:userStateSet.userseq,
      email:userStateSet.email, 
      restaurantname:restaurant[choosenIndex].restaurantname,
      address:restaurant[choosenIndex].address, 
      img: restaurant[choosenIndex].img, 
      thumbImg : restaurant[choosenIndex].thumbImg,
      introduction : restaurant[choosenIndex].introduction, 

      latLng : restaurant[choosenIndex].latLng, 

      hashtagArr : hashtagArrObj, 
      hashtags : hashTagArrList
    }


    const retObj = await transactionAuth("post", "res/restaurantupdate", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      searchRestaurantLists();
    }else{
      restaurant[choosenIndex].errMsg = retObj.sendObj.message;
      setRestaurant([...restaurant]);
    }
    
  }

  async function deleteOnClick(restaurantseq:any){
    const obj = {
      restaurantseq:restaurantseq,
      email:userStateSet.email
    }

    const retObj = await transactionAuth("post", "res/restaurantdelete", obj, "", false, true, screenShow, errorShow);
    
    if(retObj.sendObj.success==="y"){
      searchRestaurantLists();
    }else{
      const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
      restaurant[choosenIndex].errMsg = retObj.sendObj.message;
      setRestaurant([...restaurant]);
    }
  }

  function introductionOnChange(e:any){
    setIntroduction(e.target.value)
  }

  function hashtagOnChange(e:any){
    setHashtag(e.target.value)
  }

  function hashtagArrSet(){
    setHashtagErrMsg("");

    
    if(!checkInputNull(hashtag)){
      setHashtagErrMsg("Please check Hashtag.");
      focusHashTag.current?.focus();
      return;
    }

    if(hashtagArr.length >= 10){
      setHashtagErrMsg("Please add less than 10.")
      focusHashTag.current?.focus();
      return;
    }

    const choosenIndex = hashtagArr.findIndex((e) => e === hashtag)
    if(choosenIndex > -1){
      setHashtagErrMsg("There is the same hashtag.");
      focusHashTag.current?.focus();
      return;
    }

    hashtagArr.push(hashtag);
    setHashtag("");
    setHashtagArr([...hashtagArr]);
  }

  function deleteTag(tagName:string){
    const choosenIndex = hashtagArr.findIndex((e) => e === tagName)
    hashtagArr.splice(choosenIndex, 1);
    setHashtagArr([...hashtagArr]);

    
  }

  function eachHashtagArrSet(restaurantseq:any){
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].hashtagErrMsg = "";
    const hashTagListName = restaurant[choosenIndex].hashTagList; 

    if(!checkInputNull(hashTagListName)){
      // setHashtagErrMsg("Please check Hashtag.");
      restaurant[choosenIndex].hashtagErrMsg = "Please check Hashtag.";
      setRestaurant([...restaurant]);
      focusHashTagList.current[hashIndex]?.focus();
      return;
    }

    if(restaurant[choosenIndex].hashTagArr.length >= 10){
      restaurant[choosenIndex].hashtagErrMsg = "Please add less than 10.";
      setRestaurant([...restaurant]);
      focusHashTagList.current[hashIndex]?.focus();
      return;
    }
    
    const choosenIndexHashTag = restaurant[choosenIndex].hashTagArr.findIndex((e) => e === hashTagListName)
    if(choosenIndexHashTag > -1){
      // setHashtagErrMsg("There is the same hashtag.");
      restaurant[choosenIndex].hashtagErrMsg = "There is the same hashtag.";
      setRestaurant([...restaurant]);
      focusHashTagList.current[hashIndex]?.focus();
      return;
    }

    restaurant[choosenIndex].hashTagList = "";
    restaurant[choosenIndex].hashTagArr.push(hashTagListName);
    setRestaurant([...restaurant]);
     
    
  }

  function eatchDeleteTag(tagName:string, restaurantseq:any){
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    const choosenIndexHashTag = restaurant[choosenIndex].hashTagArr.findIndex((e) => e === tagName)
    restaurant[choosenIndex].hashTagArr.splice(choosenIndexHashTag, 1);
    setRestaurant([...restaurant]);
  }

  function movePageOnclickHandler(page:string, name:string){
    if(page==="main") router.push('/' + name + "");
    if(page==="header") router.push('/' + name + "/headerupdate");
    if(page==="home") router.push('/' + name + "/homeupdate");
    if(page==="about") router.push('/' + name + "/aboutupdate");
    if(page==="menu") router.push('/' + name + "/menuupdate");
    if(page==="qr") router.push('/' + name + "/qrcode");   
  }

  const googleHandleModal = (restaurantseq:number, showYn:boolean, type:string) => {
    if(type==="each"){
      setGoogleMapType("each");
      setShowGooglePortal(showYn);
      setShowGooglePortalList(false);

    }else{
      setGoogleMapType("list");
      setShowGooglePortal(false);
      setShowGooglePortalList(showYn);
      setMapSelectedRestaurantseq(restaurantseq);
    }
  };

  const setRestaurantListAddressFromGoogleMap = (restaurantseq:any, latLng:any, searchText:string) => {
    
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);
    restaurant[choosenIndex].latLng = latLng;
    restaurant[choosenIndex].address = searchText;
    setRestaurant([...restaurant]);
  }

  function selectTabs(tabs:number){
    setSelectedTab(tabs)
    if(tabs === 0){ //hover:text-[#819e94] hover:border-[#819e94]
      setTabLaOyut1(" text-[#006341] border-b-[#006341] ");
      setTabLaOyut2(" hover:text-[#819e94] hover:border-[#819e94] ")
    }else{
      setTabLaOyut1(" hover:text-[#819e94] hover:border-[#819e94] ");
      setTabLaOyut2(" text-[#006341] border-b-[#006341] ")
    }
  }

  // user profile

  async function userFileUploadHandler(e:any){

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
      const imgUploadRes = await transactionFile("res/fileUploadS3", compressedFile, {}, "", false, true, screenShow, errorShow);
      if(imgUploadRes.sendObj.success === 'y'){
        setUserimg(imgUploadRes.sendObj.resObj.img_url);
        setUserthumbImg(imgUploadRes.sendObj.resObj.thumbImg_url);
      }else{
        errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
      }
    } catch (error) {
      //console.log(error)
    }

  }

  async function userDeleteImg(){
    // console.log(userimg);
    // console.log("uploads"+userimg.split("uploads")[1]);
    
    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email,
      file_key:"uploads"+userimg.split("uploads")[1],
    }
    
    const retObj = await transactionAuth("post", "res/fileDeleteS3", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === 'y'){
      setUserimg("");
      setUserthumbImg("");
    }
  }

  async function resDeleteImg(){
    // console.log(userimg);
    // console.log("uploads"+userimg.split("uploads")[1]);
    
    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email,
      file_key:"uploads"+img.split("uploads")[1],
    }
    
    const retObj = await transactionAuth("post", "res/fileDeleteS3", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === 'y'){
      setImg("");
      setThumbImg("");
    }
  }

  async function resEachDeleteImg(restaurantseq:any){
    const choosenIndex = restaurant.findIndex((val) => val.restaurantseq === restaurantseq);

    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email,
      file_key:"uploads"+restaurant[choosenIndex].img.split("uploads")[1],
    }
    
    const retObj = await transactionAuth("post", "res/fileDeleteS3", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success === 'y'){
      restaurant[choosenIndex].img = "";
      restaurant[choosenIndex].thumbImg = "";
      setRestaurant([...restaurant]);
    }
  }


  function userNameOnChange(e:any){
    setUsername(e.target.value);
  }

  async function userSaveOnClick(){
    const obj = {
      userseq:userStateSet.userseq,
      email:userStateSet.email,
      username:username,
      userimg:userimg,
      userthumbImg:userthumbImg,
    }

    const retObj = await transactionAuth("post", "userupdate", obj, "", false, true, screenShow, errorShow);
    console.log(retObj);
  } 


  async function searchUserInfo(){
    if(userStateSet.userseq === 0){
      return;
    }
    
    const obj = {
      userseq:userStateSet.userseq
    }

    const retObj = await transactionAuth("get", "searchuser", obj, "", false, true, screenShow, errorShow);

    if(retObj.sendObj.success==="y"){

      

      setUserimg(retObj.sendObj.resObj.searchUser.userimg);
      setUserthumbImg(retObj.sendObj.resObj.searchUser.userthumbImg);
      if(retObj.sendObj.resObj.searchUser.username){
        setUsername(retObj.sendObj.resObj.searchUser.username);
      }
    
      setComments(retObj.sendObj.resObj.searchComment);
      setLikes(retObj.sendObj.resObj.searchLike);
      setCommentsCnt(retObj.sendObj.resObj.commentsCnt);
      setLikesCnt(retObj.sendObj.resObj.likesCnt);
      setCommentsCurrentSeq(retObj.sendObj.resObj.lastCommentSeq);
      setLikesCurrentSeq(retObj.sendObj.resObj.lastLikeSeq);
    }
  }

  function selectList(list:number){
    setSelectedList(list);
    if(list === 0){ //hover:text-[#819e94] hover:border-[#819e94]
      setListLayOut1(" text-[#006341] border-b-[#006341] ");
      setListLayOut2("  hover:text-[#819e94] ")
    }else{
      setListLayOut1("  hover:text-[#819e94]  ");
      setListLayOut2(" text-[#006341] border-b-[#006341] ")
    }
  }

  async function commentNextSearchOnClickHandler(){
    const obj = {
      userid:userStateSet.id, 
      currentSeq:commentsCurrentSeq
    }
    const retObj = await transactionAuth("get", "searchnextcomment", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success==="y"){
      
      if(retObj.sendObj.resObj.comments.length > 0){
        setCommentsCurrentSeq(retObj.sendObj.resObj.lastCommentSeq);
        comments.push(...retObj.sendObj.resObj.comments);
        setComments(comments);
      }
    }
  }

  async function likeNextSearchOnClickHandler(){
    const obj = {
      userseq:userStateSet.userseq, 
      currentSeq:likesCurrentSeq
    }
    const retObj = await transactionAuth("get", "searchnextlike", obj, "", false, true, screenShow, errorShow);
    if(retObj.sendObj.success==="y"){
      if(retObj.sendObj.resObj.likes.length > 0){
        setLikesCurrentSeq(retObj.sendObj.resObj.lastLikeSeq);
        likes.push(...retObj.sendObj.resObj.likes);
        setLikes(likes);
      }
    }
  }

  useEffect(()=>{
    let totalByte = 0;
    for(let i =0; i < username.length; i++) {
      const currentByte = username.charCodeAt(i);
      if(currentByte > 128){
        totalByte += 2;
      }else {
        totalByte++;
      }

      if(totalByte > 30){
        setUsername(username.substring(0, i));
        break;
      }
    }
  },[username]);


  function commentRestaurantNameOnClickHandler(restaurantName:string){
    router.push('/' + restaurantName);
  }

  return(
    <>{
      (userStateSet.id)?
      <div className="">

        <div className=""> 
           <CustomConfirm 
            show={showCustomConfirmPortal} 
            setConfirm={showCustomConfirmHandleModal}
            setConfirmRes={setConfirmRes}
            message={confirmMessage}
            fName={fName}
            params={params}
          />
        </div>

        <div className="">
          
          <div className="mb-1">
            <div className="flex justify-center items-center h-10  bg-[#006341]">
              <p className="text-white text-xl">Management</p>
            </div>
          </div>

          <div className="flex justify-center mt-5 w-[100%]">
            <div className="text-sm font-medium text-center w-[80%] text-gray-500 border-b border-[#006341] ">
              <ul className="flex flex-wrap -mb-px ">
                  <li className="me-3 ">
                      <button  
                      onClick={()=>selectTabs(0)}
                      className={tabLayOut1 + " inline-block p-3 border-transparent border-b-2  "}>Profile</button>
                  </li>
                  <li className="">
                      <button
                      onClick={()=>selectTabs(1)}
                      // className={"  text-blue-600 border-blue-600 rounded-t-lg active dark:text-blue-500"}>Restaurant</a>
                      className={tabLayOut2 + " inline-block p-3 border-transparent border-b-2 "}>Restaurant</button>
                  </li>

              </ul>
            </div>
          </div>

        
          <div className="flex justify-center mt-5 w-[100%]">
            
            
            {
              (selectedTab!==0)?
              <div className="flex justify-center w-full">
              <div className="flex flex-col w-[80%]">
                {
                  (restaurant.length > 0)?
                  <div>
                    <div className="flex justify-end mt-2">
                      <ButtonSmall onClick={()=>regScreenOnClick()} name={"NEW"}/> 
                    </div>
                  </div>:""
                }
                

                {
                  (restaurant.length > 0)?
                  restaurant.map((item:any, index:any)=>
                      {
                        return (
                          <div key={index + item.restaurantseq + item.restaurantname}>
                            <div className="flex justify-center mt-2 p-2 border-2 border-[#006341] rounded">
                            <div className="w-[120px] me-2">
                              <div className='ring-1 w-[120px] h-[120px] ring-[#006341] rounded relative ' >
                                {item.img ? (
                                  
                                      <Image 
                                      src={item.img}
                                      quality={30}
                                      layout="fill"
                                      style={{ objectFit: "cover" , borderRadius: '5px' }}
                                      alt='' />
                                  ) : ""
                                }
                              </div> 

                              <div className="flex justify-center mt-1">
                                <div className="me-1">
                                  <label className="cursor-pointer text-[10px] border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200" htmlFor={"file_input" + item.restaurantseq}>
                                      Upload Img 
                                  </label>
                                  <input className=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                                  hidden
                                  " id={"file_input" + item.restaurantseq} type="file"
                                  accept="image/*" 
                                  onChange={(e)=>eachFileUploadHandler(e, item.restaurantseq)}
                                  />

                                </div>
                                <div className="" > 
                                  <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                                  htmlFor="img_delete"
                                  // onClick={()=>eachDeleteImg(item.restaurantseq)}
                                  onClick={()=>confirmModal("IMAGE DELETE", "EACHIMGDELETE", item.restaurantseq)}
                                  >
                                    Delete
                                  </label>
                                </div>
                              </div>

                              <div className="mt-2 mx-2 ">
                                <p className="pe-1 pb-1 border-b mb-1"><ButtonSmallMove onClick={()=>movePageOnclickHandler("main", item.restaurantname)} name="main"/></p>
                                <p className="pe-1 pb-1"><ButtonSmallSettingMove onClick={()=>movePageOnclickHandler("header", item.restaurantname)} name="header"/></p>
                                <p className="pe-1 pb-1"><ButtonSmallSettingMove onClick={()=>movePageOnclickHandler("home", item.restaurantname)} name="home"/></p>
                                <p className="pe-1 pb-1"><ButtonSmallSettingMove onClick={()=>movePageOnclickHandler("about", item.restaurantname)} name="about"/></p>
                                <p className="pe-1 pb-1 border-b mb-1"><ButtonSmallSettingMove onClick={()=>movePageOnclickHandler("menu", item.restaurantname)} name="menu"/></p> 
                                <p className="pe-1 pb-1 "><ButtonQRMove onClick={()=>movePageOnclickHandler("qr", item.restaurantname)} name="QR code"/></p>
                              </div>

                            </div>
                            <div className="w-full rounded">
                              <div className="mb-1">
                                <div className="flex flex-wrap
                                ">
                                  {/* <p className="pe-1 pb-1"><ButtonSmallMove name="main"/></p>
                                  <p className="pe-1 pb-1"><ButtonSmallMove name="header"/></p>
                                  <p className="pe-1 pb-1"><ButtonSmallMove name="home"/></p>
                                  <p className="pe-1 pb-1"><ButtonSmallMove name="about"/></p>
                                  <p className="pe-1 pb-1"><ButtonSmallMove name="menu"/></p> */}
                                </div>
                                <p className="text-sm font-bold mb-1 text-[#006341]">Restaurant name</p>
                                <p >
                                  <input 
                                  type="text" 
                                  ref={(element) => {focusRestaurantNameList.current[index] = element;}}
                                  onChange={(e)=>eachRestaurantNameOnChange(e, item.restaurantseq)}
                                  className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                                  value={item.restaurantname}
                                  disabled
                                  />
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold mb-1 text-[#006341]">Address</p>
                                <p className="flex justify-center">
                                  <input type="text" 
                                  ref={(element) => {focusRestaurantAddressList.current[index] = element;}}
                                  onChange={(e)=>eachRestaurantAddressOnChange(e, item.restaurantseq)}
                                  className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                                  value={item.address}/>
                                  <span className="pt-1 ps-1 text-lg hover:text-2xl text-[#006341]"
                                  onClick={()=>googleHandleModal(item.restaurantseq, true, "list")}
                                  ><SiGooglemaps/></span>
                                </p>
                                  
                              </div>

                              <div>
                                <p className="text-sm font-bold mb-1 text-[#006341]">Introduction</p>
                                <p>
                                  <input type="text" 
                                  ref={(element) => {focusIntroductionList.current[index] = element;}}
                                  onChange={(e)=>eachIntroductionOnChange(e, item.restaurantseq)}
                                  className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                                  value={item.introduction}/></p>
                              </div>
                              
                              <div>
                                <p className="text-sm font-bold mb-1 text-[#006341]">HashTag
                                  <span className="ms-2 text-red-500 text-xs font-normal">{item.hashtagErrMsg}</span>
                                </p>
                                <p className="flex justify-center w-full">
                                  <input type="text"
                                  ref={(element) => {focusHashTagList.current[index] = element;}}
                                  onChange={(e)=>eachHashtagOnChange(e, item.restaurantseq)}
                                  className="text-[#aacfc2] border me-1 border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                                  value={item.hashTagList}/>
                                  <ButtonSmall onClick={()=>eachHashtagArrSet(item.restaurantseq)} name={"ADD"}/> 
                                </p>
                              </div>

                              <div className="flex flex-wrap mt-1 ">
                                {
                                  item.hashTagArr.map((hashTagitem:any, hashTagindex:any)=>{
                                    return (
                                      <div key={hashTagitem + hashTagindex} >
                                        <ButtonTag onClick={()=>eatchDeleteTag(hashTagitem,item.restaurantseq )} name={hashTagitem}/>
                                      </div>
                                      
                                    )
                                  })
                                }
                              </div>



                              <div className="flex justify-end mt-2">
                                <p className="me-1">
                                  <ButtonSmall onClick={()=>confirmModal("UPDATE", "UPDATE", item.restaurantseq)} name={"UPDATE"}/>
                                </p>
                                <p>
                                  <ButtonSmall onClick={()=>confirmModal("DELETE", "DELETE", item.restaurantseq)} name={"DELETE"}/>
                                </p>
                              </div>
                            </div>
                          </div> 
                          </div>
                        )
                      }
                    )
                    
                  // <div className="border">
                  //   {restaurant[0].restaurantname as any}
                  // </div>
                  :
                  <div className="w-full flex justify-center">
                    <p className=" text-[#006341]">
                    {`There are no registered restaurants.
                    Would you like to register? `}
                    <button
                    onClick={()=>regScreenOnClick()} 
                    className="cursor-pointer font-bold text-[#006341] hover:text-[#CE1126]">Yes
                    </button></p>
                  </div>
                }

                { 
                  (regScreenYn)?
                  <>
                  {/* <div>
                    <GoogleMap3/>
                  </div> */}
                  <div className="flex justify-center mt-2 p-2 border-2 border-[#006341] rounded">
                    <div className="w-[120px] me-2">
                      <div className='ring-1 w-[120px] h-[120px] ring-[#006341] rounded relative ' >
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

                      <div className="flex justify-center mt-1">
                        <div className="me-1">
                          <label className="cursor-pointer text-[10px] border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200" htmlFor="file_input">
                              Upload Img 
                          </label>
                          <input className=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                          hidden
                          " id="file_input" type="file"
                          accept="image/*" 
                          onChange={(e)=>fileUploadHandler(e)}
                          />

                        </div>
                        <div className="" > 
                          <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                          htmlFor="img_delete"
                          // onClick={()=>deleteImg()}
                          onClick={()=>confirmModal("IMAGE DELETE", "IMGDELETE", "")}
                          >
                            Delete
                          </label>
                        </div>
                      </div>

                    </div>
                    <div className="w-full rounded">
                      <div className="mb-1">
                        <p className="text-sm font-bold mb-1 text-[#006341]">Restaurant name</p>
                        <p >
                          <input 
                          ref={focusRestaurantName}
                          type="text" 
                          onChange={(e)=>restaurantNameOnChange(e)}
                          className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                          value={restaurantName}/>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1 text-[#006341]">Address</p>
                        <p className="flex justify-center">
                          <input type="text" 
                          onChange={(e)=>restaurantAddressOnChange(e)}
                          className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                          value={restaurantAddress}/>
                          <span className="pt-1 ps-1 text-lg hover:text-2xl text-[#006341]"
                          onClick={()=>googleHandleModal(0, true, "each")}
                          ><SiGooglemaps/></span>
                        </p>
                        
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1 text-[#006341]">Introduction</p>
                        <p>
                          <input type="text" 
                          onChange={(e)=>introductionOnChange(e)}
                          className="text-[#aacfc2] border border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                          value={introduction}/></p>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1 text-[#006341]">HashTag
                          <span className="ms-2 text-red-500 text-xs font-normal">{hashtagErrMsg}</span>
                        </p>
                        <p className="flex justify-center w-full">
                          <input type="text"
                          ref={focusHashTag} 
                          onChange={(e)=>hashtagOnChange(e)}
                          className="text-[#aacfc2] border me-1 border-[#aacfc2] w-full px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                          value={hashtag}/>
                          <ButtonSmall onClick={()=>hashtagArrSet()} name={"ADD"}/> 
                        </p>
                      </div>
                      <div className="flex flex-wrap mt-1 "
                      // onClick={()=>hashtagArrSet()}
                      >
                        {
                          hashtagArr.map((item:any, index:any)=>{
                            return (
                              <div key={index+item} >
                                <ButtonTag onClick={()=>deleteTag(item)} name={item}/>
                              </div>
                              
                            )
                          })
                        }
                      </div>
                      <div>
                        <p className="mt-1 flex justify-center text-red-500 text-xs">{errMsg}</p>
                      </div>
                      <div className="flex justify-end mt-2">
                        {/* <ButtonSmall onClick={()=>saveOnClick()} name={"SAVE"}/>  */}
                        <ButtonSmall onClick={()=>confirmModal("SAVE", "SAVE", )} name={"SAVE"}/>
                      </div>
                    </div>
                  </div> 
                  
                  
                  </>

                  
                  :
                  <div></div>
                }
                <GoogleMapPopup show={showGooglePortal} googleHandleModal={googleHandleModal} 
                setSearchText={setRestaurantAddress} searchText={restaurantAddress} setLatLng={setLatLng} 
                googleMapType={googleMapType}
                mapSelectedRestaurantseq={mapSelectedRestaurantseq}
                setRestaurantListAddressFromGoogleMap={setRestaurantListAddressFromGoogleMap}
                />

                <GoogleMapPopup show={showGooglePortalList} googleHandleModal={googleHandleModal} 
                setSearchText={setRestaurantAddress}
                searchText={restaurantAddress} setLatLng={setLatLng}  
                googleMapType={googleMapType}
                mapSelectedRestaurantseq={mapSelectedRestaurantseq}
                setRestaurantListAddressFromGoogleMap={setRestaurantListAddressFromGoogleMap}
                />
              </div>
            </div>
            :
            //profile/////////////////////////////////////////////////////////// 
            <div className="flex justify-center w-full">
              <div className="flex flex-col w-[80%]">
                  <div>
                    <div className="flex justify-end mt-2">
                      <ButtonSmall 
                      onClick={()=>userSaveOnClick()}
                      name={"SAVE"}/> 
                    </div>
                  </div>

                

                <div className="grid  mt-2 
                2xl:justify-normal xl:justify-normal lg:justify-normal md:justify-normal sm:col-1
                2xl:flex xl:flex lg:flex md:flex sm:grid
                ">  

                  <div className="">
                    <div className="flex justify-center
                    2xl:justify-normal xl:justify-normal lg:justify-normal md:justify-normal sm:justify-center 
                    ">
                      <div className='ring-1 w-[200px] h-[200px] ring-[#006341] rounded relative ' >
                        
                        
                        
                        {
                          (userimg)?
                          <Image 
                          src={userimg}
                          quality={30}
                          layout="fill"
                          style={{ objectFit: "cover" , borderRadius: '5px' }}
                          alt='' />
                          :""
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
                        onChange={(e)=>userFileUploadHandler(e)}
                        />

                      </div>
                      <div className="" > 
                        <label className=" cursor-pointer text-[10px]  border hover:bg-gray-400 text-black font-bold py-1 px-1 rounded bg-gray-200"
                        htmlFor="img_delete"
                        // onClick={()=>userDeleteImg()}
                        onClick={()=>confirmModal("DELETE", "USERIMGDELETE", "")}
                        >
                          Delete
                        </label>
                      </div>
                    </div>





                    <div className="flex justify-center mt-2">
                      <input 
                      type="text" 
                      ref={focusUserName}
                      onChange={(e)=>userNameOnChange(e)}
                      className=" text-[#aacfc2] border border-[#aacfc2] w-[200px] px-2 py-1 text-sm focus:border-[#006341] focus:text-[#006341] outline-none rounded"
                      value={username}
                      />
                      
                    </div>
                    <div className="flex justify-center mt-2 text-[#006341] ">
                      <p className=" text-lg"><MdOutlineComment/></p>
                      <p className="ms-1 text-sm me-3">{commentCnt}</p>
                      <p className=" text-lg"><AiFillLike/></p>
                      <p className="ms-1 text-sm ">{likesCnt}</p>
                      
                    </div>

                    <div className="flex justify-center mt-2 border-t pt-2 border-[#006341]">
                      <p className="w-[200px] justify-normal text-gray-500 ">
                        <span 
                        onClick={()=>selectList(0)}
                        className={ listLayOut1 + " cursor-pointer "}>
                          Comments
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex justify-center mt-2 mb-5 pb-2 border-b border-[#006341]">
                      <p className="w-[200px] justify-normal text-gray-500 ">
                        
                        <span 
                        onClick={()=>selectList(1)}
                        className={listLayOut2 + "  cursor-pointer "}>
                          Likes
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className=" w-full h-full ">
                  {
                    (selectedList === 0)?
                    // comments list
                    <div>
                      {
                        comments.map((value:any, index:any) => {
                          return (
                            <div key={value._id + index + ""} 
                            className="w-full px-5 mb-5"
                            >
                              <div className="flex justify-between mb-2">
                                <p 
                                onClick={()=>commentRestaurantNameOnClickHandler(value.restaurantinfo.restaurantname)}
                                className="text-2xl font-bold text-[#006341] cursor-pointer
                                whitespace-pre-line break-words  line-clamp-1
                                hover:text-[25px]
                                ">
                                  {value.restaurantinfo.restaurantname}
                                </p>
                                <p className=" flex items-center text-xs text-[#006341]
                                
                                ">
                                  <span className="whitespace-pre-line break-words  line-clamp-1">{getDate(value.regdate)}</span>
                                </p>
                              </div>
                              <div className="w-full rounded h-[120px]">
                                <textarea
                                disabled={true}
                                spellCheck={false} 
                                value={value.comment} 
                                className="
                                resize-none border w-full h-full px-2 py-1 text-sm bg-slate-100
                                focus:border-[#006341] focus:bg-white text-[#006341] outline-none rounded
                                "
                                />

                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="w-full p-2 mb-5">
                        <div className="flex justify-end">
                        {
                          (comments.length > 0)?
                          <ButtonCommentSave
                          onClick={()=>commentNextSearchOnClickHandler()}
                          name={"next"}/>
                          :""
                        }
                        </div>
                      </div>
                    </div>
                    
                    :
                    <div>
                    {/* likes */}
                      {
                        likes.map((value:any, index:any)=>{
                          return (
                            <div key={value._id + index}
                            className="w-full px-5  ">

                                <div className="flex justify-normal w-full h-[65px] pb-3 mb-3 border-b border-[#006341]">
                                  <div className="flex items-center">
                                  
                                    {
                                    (value.restaurantinfo.thumbImg)?
                                    <div className='ring-1 w-[55px] h-[55px] ring-[#006341] rounded relative ' >
                                    <Image 
                                    src={value.restaurantinfo.thumbImg}
                                    quality={30}
                                    layout="fill"
                                    style={{ objectFit: "cover" , borderRadius: '5px' }}
                                    alt='' />
                                    </div>
                                    :""
                                    }
                                    
                                  </div>
                                  <div className=" ms-2  ">
                                    <p className="text-base font-bold text-[#006341] ">
                                      <span 
                                      onClick={()=>commentRestaurantNameOnClickHandler(value.restaurantinfo.restaurantname)}
                                      className="cursor-pointer
                                      whitespace-pre-line break-words  line-clamp-1
                                      max-w-[190px] text-2xl
                                      hover:text-[25px]
                                      2xl:max-w-[450px] xl:max-w-[450px] lg:max-w-[350px] md:max-w-[350px] sm:max-w-[190px]
                                      ">
                                      {value.restaurantinfo.restaurantname}
                                      </span>
                                      
                                    </p>
                                    <p className="flex justify-normal text-sm text-[#006341] ">
                                      <span className="me-1 pt-0.5 text-xs
                                      2xl:text-sm xl:text-sm lg:text-sm md:text-xs sm:text-xs
                                      "><GoLocation/></span>
                                      <span className="text-xs
                                      whitespace-pre-line break-words  line-clamp-2
                                      2xl:text-sm xl:text-sm lg:text-sm md:text-xs sm:text-xs
                                      ">{value.restaurantinfo.address}</span>
                                    </p>
                                  </div>
                                  
                                </div>
                                      
                              

                            </div>
                          )
                        })
                      }
                      <div className="w-full p-2 mb-5">
                        <div className="flex justify-end">
                        {
                          (comments.length > 0)?
                          <ButtonCommentSave
                          onClick={()=>likeNextSearchOnClickHandler()}
                          name={"next"}/>
                          :""
                        }
                        </div>
                      </div>

                    </div>
                  }  
                  </div>

                </div>

              </div>
            </div>
            }
            
            
          
          </div>
        

        </div>
        
      </div>
      :
      <LoginMove/>
    }
    
    </>
  );
};

export default Main