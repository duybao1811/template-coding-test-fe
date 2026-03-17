import React from 'react';
import { HiOutlineMicrophone } from "react-icons/hi";

const RecordButton = () => {
  return (
    <div className={'w-8 h-8 rounded-full bg-primary hover:bg-primary300 cursor-pointer flex items-center justify-center'}>
      <HiOutlineMicrophone color={'white'} size={16} />
    </div>
  );
};

export default RecordButton;