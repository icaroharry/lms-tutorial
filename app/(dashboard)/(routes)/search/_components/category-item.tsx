"use client";

import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({ label, icon: Icon }: CategoryItemProps) => {
  return (
    <button>
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
