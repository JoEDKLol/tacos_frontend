'use client';
import React, { useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
import QuillNoSSRWrapper from './quillEditor';
import ReactQuill from 'react-quill-new';


const QuillEditorScreen = () => {
  
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


  return(
    <>  
      <div>
      <QuillNoSSRWrapper
        ref={quillInstance}
        theme="snow" 
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