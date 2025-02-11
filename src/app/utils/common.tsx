
'use client';
const getRandomNumber = (n:number) => {

    let retNum = "";
    for (let i = 0; i < n; i++) {
        retNum += Math.floor(Math.random() * 10)
    }
    return retNum;

}

const addComma = (price:number) => {
    const returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

const storeAccessToken = (accesstoken:string) => {
    return sessionStorage.setItem('myblog-accesstoken', accesstoken);
}

const getAccessToken = () => {
    return sessionStorage.getItem('myblog-accesstoken');
}

const clearAccessToken = () => {
    return sessionStorage.removeItem("myblog-accesstoken");
}

const getDate = (str:string) => {

    const year = str.substring(0, 4) + ".";;
    const month = str.substring(5, 7) + ".";;
    const day = str.substring(8, 10) + " ";;
    const time = str.substring(11, 19);;
    const retStr = year + month + day + time; 

    return retStr;
}

export  {getRandomNumber, addComma, storeAccessToken, getAccessToken, getDate, clearAccessToken}