import { X } from "lucide-react";
import { useEffect, useState } from "react";

type CalendarTagProps = {
  onTagChange?: (data: { tags: string[] }) => void;
};

const CalendarTag = ({ onTagChange }: CalendarTagProps) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(["태그1", "태그2", "태그3"]);

  // ✅ 태그가 변경될 때마다 부모에게 알림
  useEffect(() => {
    onTagChange?.({ tags });
  }, [tags, onTagChange]);

  const handleAddTag = () => {
    const trimmedTag = tag.trim();
    // ✅ 빈 값이 아니고, 이미 존재하는 태그가 아닐 때만 추가
    if (trimmedTag !== "" && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTag("");
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-165 flex flex-col itmes-center gap-5">
      <div className="w-full flex items-center justify-between">
        <p className="py-1.5 typo-h2-semibold text-color-highest">태그 설정</p>
        <input
          className="w-[551px] h-10 border-2 border-border-mid rounded-lg 
        bg-surface-bg px-4 typo-body1 text-color-highest placeholder:text-color-mid"
          placeholder="태그명 입력"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // ✅ 한글 조합 중이면 무시 (IME 문제 해결)
              if (e.nativeEvent.isComposing) return;
              // ✅ form submit 방지 & 이벤트 버블링 방지
              e.preventDefault();
              e.stopPropagation();
              handleAddTag();
            }
          }}
        />
      </div>
      <div className="w-165 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className=" h-11 flex px-5 py-2.5 justify-center items-center gap-2.5 rounded-4xl bg-brand-blue-100"
          >
            <p className="typo-body2 text-color-high">{tag}</p>
            <X
              className="w-6 h-6 text-color-high cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTag(tag);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarTag;
