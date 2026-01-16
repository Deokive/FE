import DiaryCard from "@/components/common/Card/DiaryCard";

interface DiaryListProps {
  diary?: Diary[];
  limit?: number;
  isEditMode?: boolean; // ✅ 편집 모드
  selectedIds?: number[]; // ✅ 선택된 ID들
  onSelect?: (diaryId: number) => void; // ✅ 선택 핸들러
}

interface Diary {
  id?: number;
  archiveId?: number;
  title?: string;
  image?: string;
  date?: string;
  onClick?: () => void;
}

const DiaryList = ({
  diary,
  limit,
  isEditMode = false,
  selectedIds = [],
  onSelect,
}: DiaryListProps) => {
  const displayDiary = limit ? diary?.slice(0, limit) : diary;

  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      <div className="flex flex-wrap items-start justify-between gap-[80px]">
        {displayDiary?.map((diary) => (
          <DiaryCard
            key={diary.id}
            archiveId={diary.archiveId}
            diaryId={diary.id}
            title={diary.title}
            image={diary.image}
            date={diary.date}
            isEditMode={isEditMode}
            isSelected={selectedIds.includes(diary.id || 0)}
            onSelect={() => diary.id && onSelect?.(diary.id)}
            onClick={() => {
              if (!isEditMode) {
                console.log(diary.id + "번 덕질일기 클릭");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
