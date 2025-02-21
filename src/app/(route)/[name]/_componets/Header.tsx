'use client';

import Image from "next/image";


const Header = (props:any) => {  
  
  const layout = props.hearderLayout;

  return( 
    
    <div>
      <div className="">
        <div className={" relative top-0 left-0  w-[100%] z-10 " } 
        style={{backgroundColor:layout.bgColor, 
                height:layout.headerHight + "px", 
                borderColor:layout.borderColor , 
                borderWidth:layout.headerBorderWidth + "px"}}>
          
          <div className=" absolute w-full h-full -z-30">
            {
              (layout.hearderType === "a")?
              <p className="">
                {
                  (layout.hearderImg)?
                  <Image
                  src={layout.hearderImg}
                  alt=""
                  quality={70} 
                  layout="fill"
                  loading="lazy"
                  style={{ objectFit: "cover"}}
                />
                  :""
                }
              </p>
              :""
            }  
          
          </div>  
          
          <div className="absolute flex items-center h-[100%] w-full -z-20  ">
            
            <div className="m-5 flex justify-center items-center ">
              {
                (layout.logoType === "a")?
                <>
                <div className=" flex items-center absolute left-3   "
                style={{
                  width:layout.imageWidthSize + "px" , 
                  height:layout.imageHeightSize + "px", 
                  borderColor:layout.logoBoxBorderColor, 
                  borderRadius:layout.logoBoxRadius + "px", 
                  borderWidth:layout.logoBoxBorderSize + "px",

                }}
                > 
                  {
                    layout.img ? <Image
                    src={layout.img}
                    alt=""
                    quality={70} 
                    layout="fill"
                    loading="lazy"
                    style={{ 
                      objectFit: "cover", 
                      borderRadius: layout.logoBoxRadius + "px",
                      borderWidth:layout.logoBoxBorderSize + "px",
                    }}
                    />
                    :<p className="w-full h-full flex justify-center items-center">IMG</p>
                  }
                </div>
                </>
                :
                <div className=" flex items-center absolute left-3   "
                style={
                  {
                    fontSize:layout.logoSize + "px", 
                    fontWeight:"bold", 
                    color:layout.logoColor, 
                  }
                }
                > 
                  <input type="text" className="rounded text-center w-full border outline-none"
                  value={layout.logoText}
                  readOnly
                  style={{
                    backgroundColor:layout.logoBoxBgColor, 
                    width:layout.logoBoxSize + "px" , 
                    height:layout.logoBoxSizeHeigh + "px",
                    borderColor:layout.logoBoxBorderColor, 
                    borderWidth:layout.logoBoxBorderSize + "px",
                    borderRadius:layout.logoBoxRadius + "px"
                  }}
                  />
                </div> 
              }
            </div>
            <div className=" m-1 flex justify-center absolute " style={
                {
                  fontSize:layout.restaurantTitleSize + "px", 
                  fontWeight:"bold", 
                  left: "50%", 
                  marginLeft : -(Number(layout.titleBoxSize)/2) + "px", 
                  color:layout.restaurantTitleColor, 

                }
              }>
              <input className=" p-1 rounded text-center outline-none"
              value={layout.titleText}
              readOnly
              style={{
                
                backgroundColor:layout.titleBoxBgColor, 
                width:layout.titleBoxSize + "px" , 
                height:layout.titleBoxSizeHeight + "px" ,
                borderColor:layout.titleBoxBorderColor, 
                borderWidth:layout.titleBoxBorderSize + "px",
                borderRadius:layout.titleBoxRadius + "px"
              }}
              ></input>
            </div> 
          </div>
          
        </div>  
      </div>
      {/* menu start */}
      <div className=" flex  justify-center items-center " style={{backgroundColor:layout.menuBgColor, height:layout.menuHeight + "px", borderColor:layout.menuBorderColor , borderWidth:layout.menuBorderWidth + "px"}}>
        <div className="m-1 flex justify-between " style={
          {
            fontSize:layout.menuTextSize + "px", 
            fontWeight:"bold", 
            color:layout.menuTextColor, 
            width:layout.menuItemPadding + "px" , 
            
          }
        }>
          <input className=" p-1 rounded text-center outline-none "
            value={layout.menuText1}
            // onChange={(e)=>menuText1OnChange(e)}
            readOnly
            style={{
            backgroundColor:layout.menuBoxColor, 
            width:layout.menuTextBoxSize + "px" , 
            height:layout.menuTextBoxSizeHeight + "px" ,
            borderColor:layout.menuBoxBorderColor, 
            borderWidth:layout.menuTextBorderWidth + "px",
            borderRadius:layout.menuTextBoxRadiusSize + "px"
          }}
          ></input>

          <input className=" p-1 rounded text-center outline-none "
            value={layout.menuText2}
            // onChange={(e)=>menuText2OnChange(e)}
            readOnly
            style={{
            backgroundColor:layout.menuBoxColor, 
            width:layout.menuTextBoxSize + "px" , 
            height:layout.menuTextBoxSizeHeight + "px" ,
            borderColor:layout.menuBoxBorderColor, 
            borderWidth:layout.menuTextBorderWidth + "px",
            borderRadius:layout.menuTextBoxRadiusSize + "px"
          }}
          ></input>

          <input className=" p-1 rounded text-center outline-none "
            value={layout.menuText3}
            // onChange={(e)=>menuText3OnChange(e)}
            readOnly
            style={{
            backgroundColor:layout.menuBoxColor, 
            width:layout.menuTextBoxSize + "px" , 
            height:layout.menuTextBoxSizeHeight + "px" ,
            borderColor:layout.menuBoxBorderColor, 
            borderWidth:layout.menuTextBorderWidth + "px",
            borderRadius:layout.menuTextBoxRadiusSize + "px"
          }}
          ></input>
        </div> 
      </div>
      {/* menu end */}
    </div>
  );
};

export default Header