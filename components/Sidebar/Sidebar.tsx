'use client';

import React from 'react';
import {
  FiHome,
  FiFileText,
  FiImage,
  FiVideo,
  FiMoreHorizontal,
  FiFolder,
  FiLogIn,
} from 'react-icons/fi';
import { PiPresentationChart, PiCrownSimpleBold } from 'react-icons/pi';
import { MdOutlineDesignServices, MdOutlineBrandingWatermark } from 'react-icons/md';
import { TbTemplate } from 'react-icons/tb';
import clsx from 'clsx';
import Tooltip from "@/components/Tooltip/Tooltip";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const menus: MenuItem[] = [
  { label: 'Home', icon: <FiHome size={18} />, active: true },
  { label: 'Document', icon: <FiFileText size={18} /> },
  { label: 'Design', icon: <MdOutlineDesignServices size={18} /> },
  { label: 'Presentation', icon: <PiPresentationChart size={18} /> },
  { label: 'Image', icon: <FiImage size={18} /> },
  { label: 'Video', icon: <FiVideo size={18} /> },
  { label: 'More', icon: <FiMoreHorizontal size={18} /> },
  { label: 'Templates', icon: <TbTemplate size={18} /> },
  { label: 'Brand', icon: <MdOutlineBrandingWatermark size={18} /> },
  { label: 'Projects', icon: <FiFolder size={18} /> },
];

export default function Sidebar() {
  return (
    <div className="flex h-screen w-[68px] flex-col justify-between bg-foreground">
      <div className="flex flex-col gap-3 px-2 py-3">
        {menus.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 px-2 py-3">
        <SidebarItem icon={<FiLogIn size={18} />} label="Sign in" />
        <UpgradeItem />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }: SidebarItemProps) {
  return (
    <div className="group relative flex justify-center">
      <button className={'flex w-full flex-col items-center justify-center rounded-xl text-text-primary transition-all duration-200 outline-none cursor-pointer'}>
        <span
          className={clsx('flex h-[28px] w-full items-center justify-center rounded-full transition-colors duration-200 bg-transparent group-hover:bg-[#d8dfee]',)}
        >
          {icon}
        </span>

        <span className="mt-0.5 text-xs2">{label}</span>
      </button>

      <Tooltip label={label} />
    </div>
  );
}

function UpgradeItem() {
  return (
    <div className="group relative flex justify-center">
      <button className="flex w-full flex-col items-center justify-center rounded-xl py-2 text-text-primary transition-all duration-200">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm">
          <PiCrownSimpleBold size={20} />
        </span>
        <span className="mt-1 text-xs2 leading-none">Upgrade</span>
      </button>

      <Tooltip label="Upgrade" />
    </div>
  );
}
