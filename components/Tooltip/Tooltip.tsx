import React from 'react';
import clsx from 'clsx';

type Placement = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  label: string;
  placement?: Placement;
}

const Tooltip = ({ label, placement = 'right' }: Props) => {
  const positionClass = {
    top: 'bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2',
    right: 'left-[calc(100%+14px)] top-1/2 -translate-y-1/2',
    bottom: 'top-[calc(100%+14px)] left-1/2 -translate-x-1/2',
    left: 'right-[calc(100%+14px)] top-1/2 -translate-y-1/2',
  };

  const arrowClass = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2',
    right: 'left-[-6px] top-1/2 -translate-y-1/2',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2',
    left: 'right-[-6px] top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={clsx(
        'pointer-events-none absolute z-20',
        'opacity-0 transition-all duration-200 group-hover:opacity-100',
        positionClass[placement]
      )}
    >
      <div className="relative whitespace-nowrap rounded-md bg-text-primary px-3 py-1.5 text-xs font-medium text-white shadow-lg">
        {label}

        <span
          className={clsx(
            'absolute h-3 w-3 rotate-45 bg-text-primary',
            arrowClass[placement]
          )}
        />
      </div>
    </div>
  );
};

export default Tooltip;