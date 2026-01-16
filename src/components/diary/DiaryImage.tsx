import DiaryImageCard from "@/assets/icon/DiaryImageCard";
import image from "@/assets/images/diaryBackground.png";
import ImageCard from "./ImageCard";

const DiaryImage = () => {
  return (
    <div className="w-full mb-6">
      {/* ✅ 배경이 꽉 차고 하단 정렬 */}
      <div
        className="relative w-full h-[433px] flex justify-center "
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "bottom center", // ✅ 하단 중앙 정렬
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ✅ 내용은 중앙에 배치 */}
        <div className="absolute top-0 w-300 flex gap-15">
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("다이어리 이미지 추가");
            }}
          >
            <DiaryImageCard />
          </div>

          <ImageCard
            imageUrl={"https://picsum.photos/360/330"}
            onClick={() => {
              console.log("다이어리 이미지 삭제");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryImage;
