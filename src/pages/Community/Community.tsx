import CommunityTab from "@/components/community/CommunityTab";
import { useState } from "react";

const Community = () => {
  const [category, setCategory] = useState<string>("all");
  return (
    <div className="h-full pt-16 pb-16">
      <div className="px-[340px]">
        <CommunityTab value={category} onChange={setCategory} />
      </div>
    </div>
  );
};

export default Community;
