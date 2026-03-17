import React from 'react';
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {

  const itemClassName = 'rounded-full px-3 py-2 hover:bg-foreground text-xs cursor-pointer font-medium'

  return (
    <div className={'pl-20'}>
      <div className={'py-2 px-10 flex items-center justify-between'}>
        <Image src={'/logo.svg'} alt={'logo'} width={135} height={22} />
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