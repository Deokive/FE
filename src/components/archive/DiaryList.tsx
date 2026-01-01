import DiaryCard from "../common/Card/DiaryCard";

interface DiaryListProps {
  diary?: Diary[];
}

interface Diary {
  id?: number;
  archiveId?: number;
  title?: string;
  image?: string;
  date?: string;
  onClick?: () => void;
}

const DiaryList = ({ diary }: DiaryListProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 덕질일기 리스트부분 */}
      <div className="flex items-start justify-between gap-[80px]">
        {/* 3개까지 보이게 설정 */}
        {diary?.slice(0, 3).map((diary) => (
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
