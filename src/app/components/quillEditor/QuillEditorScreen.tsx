'use client';
import React, { useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
import QuillNoSSRWrapper from './QuillEditor';
import ReactQuill from 'react-quill-new';
import './styles.scss';

interface styleProps {
  bgColor: string;
}

const QuillEditorScreen = (props:styleProps) => {

  console.log(props);
  
  const [value, setValue] = useState('');
  const quillInstance = useRef<ReactQuill>(null);

  const handleEditorFocus = () => {
    console.log(quillInstance.current);
    if (quillInstance.current) {
      console.log('Editor focused!');
      // Access the Quill instance using quillRef.current.getEditor()
    }
  };

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
        ],
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

  // const styles = useMemo(
  //   () => ({
  //     ".qlContainer": { border: "none" },
      
  //   }),
  //   [],
  // );




  return(
    <>  
      <div className='quill'>asd
      <QuillNoSSRWrapper
        className="ql-error"
        ref={quillInstance}
        theme="snow"
        // style={styles}
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