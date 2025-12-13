import Chip from "../common/Chip";

type Option = { label: string; value: string };

type CommunityTabProps = {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  className?: string;
};

const DEFAULT_OPTIONS: Option[] = [
  { label: "전체", value: "all" },
  { label: "아이돌", value: "idol" },
  { label: "배우", value: "actor" },
  { label: "연주자", value: "performer" },
  { label: "스포츠", value: "sports" },
  { label: "아티스트", value: "artist" },
  { label: "애니메이션", value: "animation" },
  { label: "기타", value: "etc" },
];

export default function CommunityTab({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className = "",
}: CommunityTabProps) {
  return (
    <div
      role="tablist"
      className={[
        "w-full flex items-center justify-center gap-[23px]",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const active = opt.value === value;

        return (
          <Chip
            key={opt.value}
            active={active}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </Chip>
        );
      })}
    </div>
  );
}
