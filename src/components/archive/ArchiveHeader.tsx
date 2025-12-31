import getDPlusDay from "@/utils/dPlusDay";
import UserIcon from "@/assets/icon/S.svg";

interface ArchiveHeaderProps {
  title?: string;
  ownerNickname?: string;
  badge?: string;
  createdAt?: string;
}

const ArchiveHeader = ({
  title,
  ownerNickname,
  badge,
  createdAt,
}: ArchiveHeaderProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[20px]">
      <p className="typo-h1 text-color-highest">{title}</p>
      <div className="w-full h-[51px] flex items-center justify-between gap-[20px]">
        {/* 아카이브 소유자 부분 */}
        <button
          onClick={() => {
            console.log("프로필 페이지로 이동");
          }}
          className="flex gap-[10px] items-center cursor-pointer"
        >
          <img src={UserIcon} alt="user" className="w-[40px] h-[40px]" />
          <p className="typo-body2 text-color-high">
            {ownerNickname ?? "사용자명"}
          </p>
        </button>
        {/* 배지 */}
        <div className="flex gap-[20px] justify-center">
          <div className="flex justify-center items-center px-[20px] py-[10px] rounded-[10px] bg-surface-container-40 text-color-high">
            {badge}
          </div>
          {/* 디데이 부분 */}
          <div
            className="h-[51px] flex justify-center items-center px-[10px] py-[4px] rounded-[4px]
        bg-surface-container-40 typo-h1 text-color-lowest"
          >
            + {getDPlusDay(createdAt ?? "")} DAY
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHeader;
