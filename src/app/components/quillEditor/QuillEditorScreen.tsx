'use client';
import React, { useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
import QuillNoSSRWrapper from './QuillEditor';
import ReactQuill from "react-quill-new";
import './styles.scss';
import './styles2.scss';
// import { ImageActions } from "@xeger/quill-image-actions";
// import { ImageFormats } from "@xeger/quill-image-formats";

// ReactQuill.Quill.register("modules/imageActions", ImageActions);
// ReactQuill.Quill.register("modules/imageFormats", ImageFormats);

interface styleProps {
  bgColor: string;
}

const QuillEditorScreen = (props:styleProps) => {

  
  const [value, setValue] = useState('');
  const quillInstance = useRef<ReactQuill>(null);

  const handleEditorFocus = () => {
    // console.log(quillInstance.current);
    if (quillInstance.current) {
      console.log('Editor focused!');
      // Access the Quill instance using quillRef.current.getEditor()
    }
  };

  const modules = useMemo(
    () => ({
      // imageActions: {}, //추가
      // imageFormats: {}, //추가
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
        // handlers: {
        //   image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        // },

        // 이미지 크기 조절
        // ImageResize: {
        //   modules: ['Resize']
        // }
      },
      

      // ImageResize : {
      //   modules: ["Resize", "DisplaySize"],
      // },
      
      // imageCompress: {
      //   quality: 0.9,
      //   maxWidth: 1000, 
      //   maxHeight: 1000, 
      //   debug: false, // default
      //   suppressErrorLogging: false, 
      //   // insertIntoEditor : undefined
      //   insertIntoEditor: (imageBase64URL:any, imageBlob:any, editor:any) => {
      //     imageHandler(imageBase64URL, imageBlob, editor)
      //   }
      // },
    }),
    [],
  );

  const styles = 
    {
      backgroundColor:props.bgColor,
    };
    



  return(
    <>  
      <div className='quill'>
      <QuillNoSSRWrapper
        className="style"
        ref={quillInstance}
        theme="snow"
        style={styles}
        value={value}
        onChange={setValue}
        onFocus={handleEditorFocus}
        modules={
          modules
        }
      />
    </div>
    </>
  );
};

export default QuillEditorScreen