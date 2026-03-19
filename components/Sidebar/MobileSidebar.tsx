import React from 'react';
import Drawer from "@/components/Drawer/Drawer";
import Sidebar from "@/components/Sidebar/Sidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  return (
    <Drawer onClose={onClose} open={open}>
      <Sidebar />
    </Drawer>
  );
};

export default MobileSidebar;