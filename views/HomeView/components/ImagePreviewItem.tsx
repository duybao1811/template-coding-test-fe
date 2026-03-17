import React from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { PreviewImageItem } from '@/views/HomeView/components/InputChat';

interface Props {
  image: PreviewImageItem;
  onRemove: (id: string) => void;
}

const ImagePreviewItem = ({ image, onRemove }: Props) => {
  return (
    <div className="relative h-20 w-20 rounded-xl border border-stroke bg-foreground">
      <Image
        src={image.previewUrl}
        alt={image.file.name}
        className="object-contain"
        fill
      />

      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="absolute cursor-pointer -right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
      >
        <IoClose size={14} />
      </button>
    </div>
  );
};

export default ImagePreviewItem;