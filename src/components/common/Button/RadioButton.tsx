// src/components/common/Button/RadioButton.tsx
import { ChevronDown, ChevronUp } from "lucide-react";

interface RadioButtonProps {
  /** 라디오 버튼의 라벨 텍스트 */
  label: string;
  /** 선택 여부 */
  checked: boolean;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 드롭다운 클릭 핸들러 */
  onDropdownClick?: () => void;
  /** 드롭다운 아이콘 표시 여부 (기본: false) */
  showDropdown?: boolean;
  /** 드롭다운 열림 상태 (기본: false) */
  isDropdownOpen?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

const RadioButton = ({
  label,
  checked,
  onClick,
  onDropdownClick,
  showDropdown = false,
  isDropdownOpen = false,
  className,
}: RadioButtonProps) => {
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 라디오 버튼 클릭 이벤트 전파 방지
    onDropdownClick?.();
  };

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${className || ""}`}
      onClick={onClick}
    >
      {/* 라디오 버튼 */}
      <div className="relative flex items-center justify-center shrink-0">
        <div
          className={`w-5 h-5 rounded-full border-2 border-border-high
            transition-colors flex items-center justify-center 
          `}
        >
          {checked && <div className="w-3 h-3 rounded-full bg-[#82BEF5]" />}
        </div>
      </div>

      {/* 라벨 텍스트 */}
      <span className="w-full typo-body1 text-color-highest text-left">
        {label}
      </span>

      {/* 드롭다운 아이콘 */}
      {showDropdown && (
        <div onClick={handleDropdownClick}>
          {checked && isDropdownOpen ? (
            <ChevronUp className="w-6 h-6 text-color-high shrink-0" />
          ) : (
            <ChevronDown className="w-6 h-6 text-color-high shrink-0" />
          )}
        </div>
      )}
    </div>
  );
};

export default RadioButton;
