import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],

  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];
const format = [
  'header',
  'bold',
  'underline',
  'italic',
  'strike',
  'indent',
  'blockquote',
  'link',
  'image',
  'color',
  'background',
  'list',
  'bullet',
];

export default function EditorWrapper({ name, value, setValue }) {
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const editorRef = useRef(null);
  const cloudinaryWidgetRef = useRef(null);

  const [previewImages, setPreviewImages] = useState([]); // Lưu preview ảnh
  useEffect(() => {
    function initCloudinaryWidget() {
      if (!window.cloudinary) {
        setTimeout(initCloudinaryWidget, 500);
        return;
      }
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dcyou1pdh',
          uploadPreset: 'upload_img',
          multiple: false,
          clientAllowedFormats: ['image'],
          maxImageFileSize: 2000000,
          sources: ['local', 'url'],
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const quill = editorRef.current;
            const range = quill?.getEditorSelection?.();
            if (quill && range) {
              quill
                .getEditor()
                ?.insertEmbed?.(range.index, 'image', result.info?.secure_url);
            }
          }
        },
      );

      cloudinaryWidgetRef.current = widget;
    }
    initCloudinaryWidget();
  }, []);

  const handleImg = useCallback(() => {
    if (cloudinaryWidgetRef.current) return cloudinaryWidgetRef.current.open();
  }, []);

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImg, // Tùy chỉnh handler ảnh
      },
    },
  };

  return (
    <div className="min-h-[50vh] h-full" name={name}>
      <ReactQuill
        name={name}
        ref={editorRef}
        theme="snow"
        modules={modules}
        className="text-black text-[16px] h-[40vh]"
        value={value}
        onChange={(content) => setValue(content)}
        style={{
          height: '40vh',
          fontWeight: 400,
          fontSize: '17px',
        }}
      />
    </div>
  );
}
