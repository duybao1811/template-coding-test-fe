'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

export default function Drawer({
 open,
 onClose,
 children,
 side = 'left',
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-opacity duration-300 md:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          'w-[86%] max-w-[360px] overflow-y-auto scrollbar-hidden fixed top-0 z-50 min-h-screen max-h-screen transform bg-white shadow-xl transition-transform duration-300 ease-out md:hidden',
          side === 'left' ? 'left-0' : 'right-0',
          side === 'left'
            ? open
              ? 'translate-x-0'
              : '-translate-x-full'
            : open
              ? 'translate-x-0'
              : 'translate-x-full',
        )}
      >
        {children}
      </div>
    </>
  );
}