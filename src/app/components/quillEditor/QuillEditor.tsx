'use client';
import dynamic from 'next/dynamic';



const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill-new')

    const Quill = ({ ref, ...props } : any) => (
      <QuillComponent ref={ref} {...props} />
    )
    return Quill
  },
  {
    ssr: false
  }
  
);

export default QuillNoSSRWrapper
