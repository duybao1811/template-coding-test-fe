'use client';

import React, { useRef } from 'react';

interface Props {
  onUpload?: (file: File) => void;
  accept?: string;
  children: React.ReactNode;
}

const UploadImage = ({
 onUpload,
 accept = 'image/*',
 children,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      return;
    }
    onUpload?.(file);

    e.target.value = '';
  };

  return (
    <>
      <div className={'cursor-pointer'} onClick={handleOpenFilePicker}>
        {children}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleChangeFile}
      />
    </>
  );
};

export default UploadImage;