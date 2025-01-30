'use client';
import dynamic from 'next/dynamic';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';


const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill-new');
    QuillComponent.Quill.register("modules/imageActions", ImageActions);
    QuillComponent.Quill.register("modules/imageFormats", ImageFormats);

    const _quill = ({ ref, ...props } : any) => (
      <QuillComponent ref={ref} {...props} />
    )
    return _quill
  },
  {
    ssr: false
  }
  
);

export default QuillNoSSRWrapper
