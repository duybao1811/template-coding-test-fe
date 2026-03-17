import React from 'react';
import { FaArrowUp } from "react-icons/fa6";

interface Props {
  onClick: () => void;
}

const SendButton = ({ onClick }: Props) => {
  return (
    <div className={'w-8 h-8 rounded-full bg-primary hover:bg-primary300 cursor-pointer flex items-center justify-center'} onClick={onClick}>
      <FaArrowUp color={'white'} size={16} />
    </div>
  );
};

export default SendButton;