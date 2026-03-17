'use client';

import React, { useMemo, useState } from 'react';
import Input from '@/components/Input/Input';
import Tools from '@/views/HomeView/components/Tools';
import UpgradeBanner from '@/views/HomeView/components/UpgradeBanner';
import ImagePreviewList from '@/views/HomeView/components/ImagePreviewList';

interface Props {
  onSend: (text: string, images: File[]) => void;
}

export interface PreviewImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

const InputChat = ({ onSend }: Props) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<PreviewImageItem[]>([]);

  const handleAddImage = (file: File) => {
    const newImage: PreviewImageItem = {
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    };

    setImages((prev) => [...prev, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSend = () => {
    const trimmedText = text.trim();
    if (!trimmedText && images.length === 0) return;

    onSend(
      trimmedText,
      images.map((item) => item.file)
    );

    images.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setText('');
    setImages([]);
  };

  return (
    <div>
      <UpgradeBanner />

      <div className="rounded-xl border border-stroke bg-white px-3 pb-1.5 pt-3">
        <ImagePreviewList images={images} onRemove={handleRemoveImage} />

        <Input
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Tools
          text={text}
          hasImages={images.length > 0}
          onSend={handleSend}
          onUploadImage={handleAddImage}
        />
      </div>
    </div>
  );
};

export default InputChat;