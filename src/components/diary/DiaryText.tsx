import Image from "@/assets/images/diaryTextBackground.png";

type Props = {
  title?: string;
  content?: string;
  onTitleChange?: (value: string) => void;
  onContentChange?: (value: string) => void;
  isEditable?: boolean; // ✅ 편집 가능 여부
};

const DiaryText = ({
  title = "",
  content = "",
  onTitleChange,
  onContentChange,
  isEditable = true, // ✅ 기본값은 편집 가능
}: Props) => {
  return (
    <div
      className="w-310 h-310 relative"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "original",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute bottom-0 right-0 w-[1133px] h-[1133px] px-27.5 py-17 
      bg-[#F9FAFB] shadow-[0_4px_15px_0_rgba(0,0,0,0.15)]"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          {/* 제목 */}
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full outline-none text-[40px] font-bold text-color-high placeholder:text-color-mid"
            readOnly={!isEditable} // ✅ 편집 모드가 아니면 읽기 전용
            disabled={!isEditable} // ✅ 편집 모드가 아니면 비활성화
          />

          {/* ✅ 내용 - 점선 줄이 있는 textarea */}
          <textarea
            value={content}
            onChange={(e) => onContentChange?.(e.target.value)}
            placeholder="일기 내용을 입력하세요"
            className="w-full max-h-225 outline-none text-[30px] font-light text-color-highest placeholder:text-color-mid bg-transparent resize-none"
            rows={18}
            readOnly={!isEditable} // ✅ 편집 모드가 아니면 읽기 전용
            disabled={!isEditable} // ✅ 편집 모드가 아니면 비활성화
            style={{
              // ✅ 점선 줄 배경 패턴
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent 0,
                transparent 46px,
                #CBD5DF 46px,
                #CBD5DF 47px
              )`,
              backgroundSize: "100% 50px",
              lineHeight: "50px",
              cursor: isEditable ? "text" : "default", // ✅ 커서 스타일
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryText;
