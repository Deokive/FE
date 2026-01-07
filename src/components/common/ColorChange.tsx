import { useState } from "react";

type Color = {
  name: string;
  color: string;
};

type ColorChangeProps = {
  onColorChange?: (color: Color | null) => void;
};

const ColorChange = ({ onColorChange }: ColorChangeProps) => {
  const colors: Color[] = [
    { name: "pink", color: "#FFDFE7" },
    { name: "red", color: "#FFABAB" },
    { name: "orange", color: "#FFDEBF" },
    { name: "yellow", color: "#FFEEBB" },
    { name: "green", color: "#CEEBCC" },
    { name: "blue", color: "#82BEF5" },
    { name: "purple", color: "#DFDFFF" },
    { name: "gray", color: "#DFDCDC" },
  ];
  const [selectedColor, setSelectedColor] = useState<Color | null>(null); //기본 색은 blue

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
    onColorChange?.(color); // ✅ 부모에게 알림
  };

  return (
    <div className="flex flex-col itmes-center gap-5">
      <div className="w-full flex items-center justify-between gap-10">
        <p className="py-1.5 typo-h2-semibold text-color-highest">색상 설정</p>
        {/* 색상 칩 */}
        <div className="flex items-center gap-5">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`w-10 h-10 rounded-full cursor-pointer ${
                selectedColor?.name === color.name
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
