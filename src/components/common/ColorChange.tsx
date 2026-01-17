import type { ColorData } from "@/types/calendar";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ColorChangeProps = {
  initialColor?: ColorData | null; // ✅ 추가
  onColorChange?: (color: ColorData | null) => void;
  className?: string;
};

const ColorChange = ({
  initialColor,
  onColorChange,
  className,
}: ColorChangeProps) => {
  const colors: ColorData[] = [
    { color: "#FFDFE7" },
    { color: "#FFABAB" },
    { color: "#FFDEBF" },
    { color: "#FFEEBB" },
    { color: "#CEEBCC" },
    { color: "#82BEF5" },
    { color: "#DFDFFF" },
    { color: "#DFDCDC" },
  ];
  // ✅ 초기값으로 선택된 색상 설정
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(() => {
    if (initialColor) {
      return colors.find((c) => c.color === initialColor.color) || null;
    }
    return null;
  });

  const handleColorChange = (color: ColorData) => {
    setSelectedColor(color);
    onColorChange?.(color); // ✅ 부모에게 알림
  };

  return (
    <div className="flex flex-col itmes-center gap-5">
      <div className="w-full flex items-center justify-between gap-10">
        {/* ✅ className을 부모 div에 적용하고, span에도 폰트 클래스 적용 */}
        <p
          className={twMerge(
            "py-1.5 typo-h2-semibold text-color-highest",
            className
          )}
        >
          색상 설정
        </p>
        {/* 색상 칩 */}
        <div className="flex items-center gap-5">
          {colors.map((color) => (
            <div
              key={color.color}
              className={`w-10 h-10 rounded-full cursor-pointer ${
                selectedColor?.color === color.color
                  ? "border-5 border-border-mid"
                  : ""
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => {
                handleColorChange(color);
                console.log(color);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorChange;
