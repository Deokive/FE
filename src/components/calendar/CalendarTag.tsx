import { X } from "lucide-react";
import { useState } from "react";

const CalendarTag = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(["태그1", "태그2", "태그3"]);

  const handleAddTag = () => {
    if (tag.trim() !== "") {
      setTags([...tags, tag]);
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
