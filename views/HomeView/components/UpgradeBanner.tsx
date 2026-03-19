'use client'
import React, {useState} from 'react';
import { IoClose } from "react-icons/io5";
import { RiGeminiFill } from "react-icons/ri";
import Tooltip from "@/components/Tooltip/Tooltip";
import Image from "next/image";

const UpgradeBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={'mx-3'}>
      <div className={'bg-foreground px-4 py-2 rounded-t-xl flex items-center justify-between w-full z-10'}>
        <div className={'flex items-center gap-3'}>
          <div className={'relative cursor-pointer group'}>
            <RiGeminiFill size={16} />
            <Tooltip label={'Gemini'} placement={'top'} />
          </div>
          <div className={'relative cursor-pointer group'}>
            <Image src={'/icon_ChatGPT.png'} alt={'chatgpt icon'} width={16} height={16} />
            <Tooltip label={'ChatGPT'} placement={'top'} />
          </div>
          <div className={'relative cursor-pointer group'}>
            <Image src={'/icon_Kling.png'} alt={'Kling icon'} width={16} height={16} />
            <Tooltip label={'Kling'} placement={'top'} />
          </div>
          <div className={'relative cursor-pointer group'}>
            <Image src={'/icon_Grok.png'} alt={'Grok icon'} width={16} height={16} />
            <Tooltip label={'Grok'} placement={'top'} />
          </div>
          <div className={'relative cursor-pointer group'}>
            <Image src={'/icon_Qwen.png'} alt={'Qwen icon'} width={16} height={16} />
            <Tooltip label={'Qwen'} placement={'top'} />
          </div>
          <p className={'font-medium text-sm'}>
            <span className={'font-bold text-primary underline cursor-pointer'}>
              Upgrade
            </span>
              {' '}for best quality, speed, and full control.
          </p>
        </div>
        <div className={'cursor-pointer'} onClick={() => setVisible(false)}>
          <IoClose size={20} />
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;