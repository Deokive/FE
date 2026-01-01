interface ArchiveTitleProps {
  title?: string;
  onClick?: () => void;
}

const ArchiveTitle = ({ title, onClick }: ArchiveTitleProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[20px]">
      {/* 덕질일기 헤더부분 */}
      <div className="w-full flex gap-[10px]">
        <p className="flex-1 typo-h1 text-color-highest">{title}</p>
        <button
          onClick={onClick}
          className="h-[29px] flex items-start justify-end typo-h2-semibold text-color-high cursor-pointer"
        >
          + 더보기
        </button>
      </div>
    </div>
  );
};

export default ArchiveTitle;
