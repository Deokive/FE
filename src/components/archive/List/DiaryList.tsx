import DiaryCard from "@/components/common/Card/DiaryCard";

interface DiaryListProps {
  diary?: Diary[];
  limit?: number;
}

interface Diary {
  id?: number;
  archiveId?: number;
  title?: string;
  image?: string;
  date?: string;
  onClick?: () => void;
}

const DiaryList = ({ diary, limit }: DiaryListProps) => {
  // ✅ limit이 있으면 그만큼만, 없으면 전체 표시
  const displayDiary = limit ? diary?.slice(0, limit) : diary;

  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 덕질일기 리스트부분 */}
      <div className="flex flex-wrap items-start justify-between gap-[80px]">
        {/* 3개까지 보이게 설정 */}
        {displayDiary?.map((diary) => (
          <DiaryCard
            key={diary.id}
            archiveId={diary.archiveId}
            title={diary.title}
            image={diary.image}
            date={diary.date}
            onClick={() => {
              console.log(diary.id + "번 덕질일기 클릭");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
