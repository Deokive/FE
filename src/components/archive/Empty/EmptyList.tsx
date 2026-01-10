import { BtnIcon } from "@/components/common/Button/Btn";
import { Plus } from "lucide-react";

interface EmptyListProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  className?: string;
}

const EmptyList = ({
  title,
  onClick,
  description,
  startIcon,
  className = "",
}: EmptyListProps) => {
  return (
    <div
      className={`w-310 h-75 px-2.5 py-22.5 flex flex-col items-center justify-center gap-10 
  rounded-lg border-2 border-solid border-border-low ${className}`}
    >
      <BtnIcon
        startIcon={startIcon ?? <Plus className="w-6 h-6 text-color-high" />}
        onClick={() => {
          onClick?.();
        }}
      >
        {title}
      </BtnIcon>
      <p className="typo-h2 text-color-low text-center">{description}</p>
    </div>
  );
};

export default EmptyList;
