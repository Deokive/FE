import DiaryImageCard from "@/assets/icon/DiaryImageCard";
import image from "@/assets/images/diaryBackground.png";
import ImageCard from "./ImageCard";
import { useRef } from "react";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type DiaryImageProps = {
  images?: ImageItem[];
  onImageAdd?: (file: File) => void;
  onImageDelete?: (id: string) => void;
};

const DiaryImage = ({
  images = [],
  onImageAdd,
  onImageDelete,
}: DiaryImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ 파일 선택 핸들러 (여러 파일 지원)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 여러 파일 추가
      Array.from(files).forEach((file) => {
        onImageAdd?.(file);
      });
    }
    // input 초기화
    e.target.value = "";
  };

  // ✅ 파일 선택 열기
  const handleImageCardClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ 이미지 삭제
  const handleImageDelete = (id: string) => {
    onImageDelete?.(id);
  };

  return (
    <div className="w-full mb-6">
      {/* ✅ 배경이 꽉 차고 하단 정렬 */}
      <div
        className="relative w-full h-[433px] flex justify-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        {/* ✅ 내용은 중앙에 배치 - 가로 스크롤 가능 */}
        <div className="absolute top-0 w-310 h-full">
          <div
            className="flex gap-15 overflow-x-auto overflow-y-hidden h-full pb-4 scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE, Edge (구버전)
            }}
          >
            {/* ✅ 이미지 추가 버튼 */}
            <div
              className="cursor-pointer flex-shrink-0"
              onClick={handleImageCardClick}
            >
              <DiaryImageCard />
            </div>

            {/* ✅ 업로드된 이미지들 표시 */}
            {images.map((imageItem) => (
              <div key={imageItem.id} className="flex-shrink-0">
                <ImageCard
                  imageUrl={imageItem.previewUrl}
                  onClick={() => handleImageDelete(imageItem.id)}
                />
              </div>
            ))}

            {/* ✅ 숨겨진 파일 input (여러 파일 선택 가능) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryImage;
