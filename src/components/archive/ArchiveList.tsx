import ArchiveCard from "./ArchiveCard";

interface Archive {
  archiveId: number;
  userId: number;
  title: string;
  bannerUrl: string;
  image: string;
}

type Props = ArchiveListProps & {
  isEditMode?: boolean;
};

interface ArchiveListProps {
  archive: Archive[];
}
const ArchiveList = ({ archive, isEditMode = false }: Props) => {
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
          onClick={() => {
            console.log(archive.archiveId + "번 아카이브 클릭");
          }}
        />
      ))}
    </div>
  );
};

export default ArchiveList;
