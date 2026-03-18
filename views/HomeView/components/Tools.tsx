import React from 'react';
import RecordButton from '@/views/HomeView/components/RecordButton';
import SendButton from '@/views/HomeView/components/SendButton';
import { FaPlus } from 'react-icons/fa6';
import Tooltip from '@/components/Tooltip/Tooltip';
import UploadImage from '@/components/UploadImage/UploadImage';
import StopButton from "@/views/HomeView/components/StopButton";

interface Props {
  text: string;
  hasImages?: boolean;
  isSending: boolean;
  onSend: () => void;
  onStop: () => void;
  onUploadImage: (file: File) => void;
}

const Tools = ({ text, hasImages = false, onSend, onUploadImage, isSending, onStop }: Props) => {
  return (
    <div className="mt-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <UploadImage onUpload={onUploadImage}>
          <div className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-foreground">
            <FaPlus size={16} />
            <Tooltip label="Upload files and more features" placement="top" />
          </div>
        </UploadImage>
      </div>

      {
        isSending ? (
          <StopButton onClick={onStop} />
        ) : (
          text.trim() || hasImages ? <SendButton onClick={onSend} /> : <RecordButton />
        )
      }
    </div>
  );
};

export default Tools;