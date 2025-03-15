'use client';

import GoogleMap5 from "@/app/components/googleMap/GoogleMap5";
import QuillEditorScreen from "@/app/components/quillEditor/QuillEditorScreen";

const Main = (props:any) => {
  const layout = props.aboutLayout;
  
  return(
    <div className="">  
      
      <div className={" h-[100%] p-1 flex justify-center  " } style={{backgroundColor:layout.bgColor, paddingTop:layout.quillTop + "px"}}>
        <div className="">  
          <QuillEditorScreen bgColor={layout.bgColorQuill} content={layout.content} readOnly={true} styleType={"style2"} quillWidth={layout.quillWidth}/>
          <div className="my-10 grid grid-cols-1
          2xl:flex xl:flex lg:flex md:flex sm:grid
          2xl:justify-center xl:justify-center lg:justify-center md:justify-center sm:grid-cols-1
          ">
            <div className="w-full flex justify-center me-2
            2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full
            ">
              <div className="w-full ">
                <p className="" 
                style={{fontSize:layout.locationTextSize + "px" , fontWeight:"bold", color:layout.locationColor}}
                >
                Location      
                {/* <span className="inline-block ">asdf</span> */}
                </p>
                <p className="">
                  <textarea
                  readOnly={true}
                  className=" w-full resize-none break-all outline-none py-2  " 
                  spellCheck={false} 
                  value={props.address}
                  rows={3}
                  style={{fontSize:layout.addressTextSize + "px", fontWeight:"bold", color:layout.addressColor , backgroundColor:layout.bgColor}}
                  ></textarea>
                </p>
                
                <p className="my-3" 
                style={{fontSize:layout.phoneNumberTextSize + "px", fontWeight:"bold", color:layout.phoneNumberColor}}
                >
                  <input type="text" className="w-full border-[#006341] outline-none px-2 py-1 rounded-lg" 
                  readOnly={true}
                  value={layout.phoneNum}
                  style={{backgroundColor:layout.bgColor}}
                  />
                </p>
                
              </div>
            </div>
            {/* 지도 */}
            <div className=" w-full flex justify-center items-center 
            2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full 
            ">
              <GoogleMap5 latLng={props.latLng}/>
            </div>                    
          </div>  
        </div>
      </div>
    </div>
  );
};
  
  export default Main