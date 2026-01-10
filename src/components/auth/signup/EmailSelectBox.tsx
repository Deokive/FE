// src/components/auth/signup/EmailSelectBox.tsx
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronDown, ChevronUp } from "lucide-react";

export type EmailSelectBoxOption = {
  label: string;
  value: string;
};

type EmailSelectBoxProps = {
  options: EmailSelectBoxOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function EmailSelectBox({
  options,
  value = "",
  onChange,
  className,
  placeholder = "직접 입력",
}: EmailSelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen]);
  // ESC 키 누르면 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // 드롭다운에서 선택 시
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // 아이콘 클릭 시 드롭다운 토글
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={twMerge("relative", className)}>
      {/* Input + 아이콘 */}
      <div
        className={twMerge(
          "w-full h-[65px] px-5 rounded-xl flex items-center gap-2",
          "bg-white border-2 border-border-mid",
          isOpen && "border-brand-blue-400"
        )}
      >
        {/* 직접 입력 가능한 input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 typo-h2 text-color-highest placeholder:text-color-low bg-transparent outline-none"
        />

        {/* 아이콘 - 클릭 시 드롭다운 토글 */}
        <button
          type="button"
          onClick={handleIconClick}
          className="p-1 cursor-pointer"
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-color-high" />
          ) : (
            <ChevronDown className="w-6 h-6 text-color-high" />
          )}
        </button>
      </div>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 py-5 bg-white rounded-xl shadow-lg flex flex-col z-10">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={twMerge(
                "w-full py-3 typo-body2-medium text-center transition-colors cursor-pointer ",
                opt.value === value
                  ? "text-color-primary typo-body2-semibold"
                  : "text-color-mid hover:text-color-high hover:bg-brand-blue-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
