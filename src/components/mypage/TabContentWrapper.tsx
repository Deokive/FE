export const TabContentWrapper: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <div
      role="region"
      aria-label={label}
      className="h-[600px] overflow-auto bg-transparent"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  );
};
