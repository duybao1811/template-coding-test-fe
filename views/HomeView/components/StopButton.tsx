import React from 'react';
import { FaStop } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

const StopButton = ({ onClick }: Props) => {
  return (
    <div className={'w-8 h-8 rounded-full bg-primary hover:bg-primary300 cursor-pointer flex items-center justify-center'} onClick={onClick}>
      <FaStop color={'white'} size={16} />
    </div>
  );
};

export default StopButton;