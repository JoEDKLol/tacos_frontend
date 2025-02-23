'use client';

import QuillEditorScreen from "@/app/components/quillEditor/QuillEditorScreen";

const Main = (props:any) => {
  const layout = props.aboutLayout;
  
  
  return(
    <div className="">  
      
      <div className={" h-[90vh] p-1 flex justify-center  " } style={{backgroundColor:layout.bgColor, paddingTop:layout.quillTop + "px"}}>
        <QuillEditorScreen bgColor={layout.bgColorQuill} content={layout.content} readOnly={true} styleType={"style2"} quillWidth={layout.quillWidth}/>
      </div>
    </div>
  );
};
  
  export default Main