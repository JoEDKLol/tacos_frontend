'use client';
import React, { useMemo, useRef } from 'react';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
// import QuillNoSSRWrapper from './QuillEditor'; 
import ReactQuill from "react-quill-new";
import './styles.scss';
import './styles2.scss';
import QuillNoSSRWrapper2 from './QuillEditor2';
import { transactionFile } from '@/app/utils/axiosFile';
import loadingScreenShow from '@/app/store/loadingScreen';
import errorScreenShow from '@/app/store/errorScreen';



const QuillEditorScreen = (props:any) => {
  const screenShow = loadingScreenShow();
  const errorShow = errorScreenShow();
  
  const quillInstance = useRef<ReactQuill>(null);

  // const handleEditorFocus = () => {
  //   // console.log(quillInstance.current);
  //   if (quillInstance.current) {
  //     console.log('Editor focused!');
  //     // Access the Quill instance using quillRef.current.getEditor()
  //   }
  // };

  const imageHandler = async (imageBase64URL:any, imageBlob:any, editor:any) => {

    // const imgUploadRes = await transactionFile("blog/fileUpload", imageBlob, obj, "", false, true, setLoadingBarState, setErrorPage);
    const imgUploadRes = await transactionFile("res/fileUploadS3", imageBlob, {}, "", false, true, screenShow, errorShow);

    if(imgUploadRes.sendObj.success === "y"){
      const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", `${imgUploadRes.sendObj.resObj.img_url}`);
    }else{
      errorShow.screenShowTrue();
        errorShow.messageSet(imgUploadRes.sendObj.resObj.errMassage);
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ["link", "image", "video"],
          ['clean'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          //         [{ align: [] }], //추가
          // ["clean"],	//추가
        ],
        handlers: {
          image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        },

        
      },
      // 이미지 크기 조절
      ImageResize : {
        modules: ["Resize", "DisplaySize"],
      },
      
      imageCompress: {
        quality: 0.5,
        maxWidth: 500, 
        maxHeight: 500, 
        debug: false, // default
        suppressErrorLogging: false, 
        // insertIntoEditor : undefined
        insertIntoEditor: (imageBase64URL:any, imageBlob:any, editor:any) => {
          imageHandler(imageBase64URL, imageBlob, editor)
        }
      },
    }),
    [],
  );

  const modules2 = useMemo(
    () => (
      {
      toolbar: null,
      
    }),
    [],
  );

  const styles = 
    {
      backgroundColor:props.bgColor,
      width: props.quillWidth + "vw",
    };
    



  return(
    <>  
      <div className='quill'>
      <QuillNoSSRWrapper2
        className={props.styleType}
        ref={quillInstance}
        theme="snow"
        style={styles}
        value={props.content}
        onChange={props.setContent}
        readOnly={props.readOnly}
        modules={
          (props.styleType==="style")?modules:modules2
        }
      />
    </div>
    </>
  );
};

export default QuillEditorScreen