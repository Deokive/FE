interface EmptyFeedListProps {
  description?: string;
}

const EmptyFeedList = ({ description }: EmptyFeedListProps) => {
  return (
    <div
      className="w-310 h-75 px-2.5 py-22.5 flex flex-col items-center justify-center gap-10 
  rounded-lg border-2 border-solid border-border-low"
    >
      <p className="typo-h2 text-color-low text-center">{description}</p>
    </div>
  );
};

export default EmptyFeedList;
