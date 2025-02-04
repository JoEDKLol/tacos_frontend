import axios from "axios";

const axiosNoAuth = axios.create({
	baseURL : process.env.API_URL, 
	withCredentials: true,
})

const transaction = async (type:string, url:string, obj:any, callback:any, callbackYn:boolean, loadingScreenYn:any, screenShow:any, errorPage:any) => {
	
	if(loadingScreenYn === true) screenShow.screenShowTrue();
	
	try{
		let resp:any, data:any;
		
		if(type === "get"){
			// resp = await axiosNoAuth.get(url ,obj);
			resp = await axiosNoAuth.get(url, {params:obj});
			data = await resp.data;
		}else if(type === "post"){
			resp = await axiosNoAuth.post(url ,obj);
			data = await resp.data;
		}

		if(loadingScreenYn === true) screenShow.screenShowFalse();


		if(url==="signin" || url==="googlesignin"){
			data.refreshToken = resp.headers.refreshtoken;
			if(callbackYn){
				callback(data);
			}else{
				return data;
			}
		}else if(url==="getAccessToken"){
			if(data.sendObj.success==="y"){
				data.accessToken = resp.headers.accesstoken;	
			}
			if(callbackYn){
				callback(data);
			}else{
				return data;
			}
		}
		else{
			if(callbackYn){
				callback(data);
			}else{
				return data;
			}
		}
		
	}
	catch(error:any){
		
		if(loadingScreenYn === true) screenShow.screenShowFalse()
		if(errorPage !== null){
			errorPage.screenShowTrue();
			errorPage.messageSet(error.response.data.message);
		} 
			
		if(error){
			if(callbackYn){
				callback("", error.response.data);
			}else{
				return error.response.data;
			}
		}
	}
}


export {transaction}; 