import Banner from "@/components/community/Banner";
import { feedDataMock } from "@/mockData/feedData";
import { useParams } from "react-router-dom";
import UserIcon from "@/assets/icon/S.svg";

const FeedDetail = () => {
  const urlParams = useParams();
  const feedId = urlParams.id;
  const feed = feedDataMock.find((feed) => feed.id === Number(feedId));
  if (!feed) {
    return <div>Feed not found</div>;
  }
  return (
    <div>
      <Banner />
      {/* 배너 밑부분 */}
      <div className="w-full flex flex-col items-start mt-[60px] gap-[60px] px-[340px]">
        <div className="w-full flex flex-col items-start gap-[20px]">
          <p className="typo-h1 text-color-highest">{feed.title}</p>
          <div className="w-full h-[51px] flex items-center gap-[20px]">
            {/* 아카이브 소유자 부분 */}
            <div className="flex w-[952px] gap-[10px] items-center">
              <img src={UserIcon} alt="user" className="w-[40px] h-[40px]" />
              <p className="typo-body2 text-color-high">{feed.ownerNickname}</p>
            </div>
            {/* 배지 */}
            <div className="flex justify-center items-center px-[20px] py-[10px] rounded-[10px] bg-surface-container-40 text-color-high">
              {feed.badge}
            </div>
            {/* 디데이 부분 */}
            <div
              className="flex justify-center items-end px-[20px] py-[4px] rounded-[4px] opacity-[0.3]
              bg-[#B2BCC2] typo-h1 text-color-lowest"
            >
              {feed.createdAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
