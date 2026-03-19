'use client'
import React, {useState} from 'react';
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import MobileSidebar from "@/components/Sidebar/MobileSidebar";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const itemClassName = 'rounded-full px-3 py-2 hover:bg-foreground text-xs cursor-pointer font-medium md:block hidden'

  return (
    <div className={'w-full max-w-7xl mx-auto'}>
      <MobileSidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
      <div className={'py-2 md:px-10 px-5 flex items-center justify-between'}>
        <div className={'flex items-center gap-2'}>
          <button onClick={() => setOpenSidebar(true)} className={'md:hidden block'}>
            <IoMenu size={20} />
          </button>
          <Image src={'/logo.svg'} alt={'logo'} width={135} height={22} />
        </div>
        <div className={'flex items-center gap-4'}>
          <div className={'h-10 w-10 flex items-center justify-center rounded-full hover:bg-foreground cursor-pointer'}>
            <IoSearchOutline size={'20'} className={'text-text-primary'} />
          </div>

          <div className={itemClassName}>
            Pricing
          </div>

          <div className={itemClassName}>
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;