import CommunityTab from "@/components/community/CommunityTab";
import { useState } from "react";
import Banner from "@/components/community/Banner";

const Community = () => {
  const [category, setCategory] = useState<string>("all");
  return (
    <div className="h-full w-full">
      <Banner />
      <div className="px-[340px] my-[40px]">
        <CommunityTab value={category} onChange={setCategory} />
      </div>
    </div>
  );
};

export default Community;
