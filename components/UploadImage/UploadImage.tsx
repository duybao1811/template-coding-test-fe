'use client';

import React, { useRef } from 'react';

interface Props {
  onUpload?: (file: File) => void;
  children: React.ReactNode;
}

const UploadImage = ({
 onUpload,
 children,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg', 'image/gif',]
    if (!allowedTypes.includes(file.type) || !file.type.startsWith('image/')) {
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
        accept={'image/png, image/jpeg, image/webp'}
        hidden
        onChange={handleChangeFile}
      />
    </>
  );
};

export default UploadImage;