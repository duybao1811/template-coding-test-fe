import React from 'react';
import { PreviewImageItem } from '@/views/HomeView/components/InputChat';
import ImagePreviewItem from '@/views/HomeView/components/ImagePreviewItem';

interface Props {
  images: PreviewImageItem[];
  onRemove: (id: string) => void;
}

const ImagePreviewList = ({ images, onRemove }: Props) => {
  if (!images.length) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-3">
      {images.map((image) => (
        <ImagePreviewItem
          key={image.id}
          image={image}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default ImagePreviewList;