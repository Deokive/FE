import { useNavigate } from "react-router-dom";
import ArchiveCard from "../ArchiveCard";
import type { Archive } from "@/types/archive";

type Props = ArchiveListProps & {
  isEditMode?: boolean;
};

interface ArchiveListProps {
  archive: Archive[];
  checkedMap?: Record<string, boolean>;
  onToggleCheck?: (id: string, checked: boolean) => void;
}
const ArchiveList = ({
  archive,
  isEditMode = false,
  checkedMap = {},
  onToggleCheck,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-310 flex flex-wrap items-start justify-start gap-x-20 gap-y-15">
      {archive.map((archive) => (
        <ArchiveCard
          key={archive.archiveId}
          archiveId={archive.archiveId}
          userId={archive.userId}
          title={archive.title}
          bannerUrl={archive.bannerUrl}
          image={archive.image}
          isEditMode={isEditMode}
          checked={!!checkedMap[String(archive.archiveId)]}
          onToggleCheck={onToggleCheck}
          onClick={() => {
            console.log(archive.archiveId + "번 아카이브 클릭");
            navigate(`/archive/${archive.archiveId}`);
          }}
        />
      ))}
    </div>
  );
};

export default ArchiveList;
