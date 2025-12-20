import { Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";

type ImgUpLoadCardProps = {
  onClick: () => void;
  // children: React.ReactNode;
  className?: string;
};

const ImgUpLoadCard = ({
  onClick,
  // children,
  className,
}: ImgUpLoadCardProps) => {
  const base =
    "w-[360px] h-[180px] rounded-[8px] text-color-lowest flex items-center justify-center";
  const enabled = "bg-surface-container-20";
  const hoverActive =
    "hover:bg-surface-container-30 active:bg-surface-container-40";
  return (
    <div onClick={onClick} className={twMerge(base, enabled, hoverActive)}>
      <Plus className="w-[47px] h-[40px]" />
    </div>
  );
};

export default ImgUpLoadCard;
