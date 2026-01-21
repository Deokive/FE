// src/components/community/Banner.tsx
import { useState } from "react";
import banner from "@/assets/images/banner.png";
import { BtnBasic } from "../common/Button/Btn";

interface BannerProps {
  image?: string;
  isEdit?: boolean;
}

const Banner = ({ image, isEdit = false }: BannerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 이미지가 있고 로딩 중일 때 스켈레톤 UI
  const isLoading = image && !imageLoaded && !imageError;

  return (
    <div className="flex justify-center items-center w-full relative">
      {/* 스켈레톤 UI - 이미지가 있고 로딩 중일 때 */}
      {isLoading && (
        <div className="w-full h-50 bg-surface-container-20 animate-pulse rounded-lg" />
      )}

      {/* 이미지 - 로드 완료되면 표시 */}
      {image && (
        <>
          <img
            src={image}
            alt="banner"
            role="img"
            className={imageLoaded ? "block w-full" : "hidden"}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
          {/* 숨겨진 이미지로 로딩 트리거 */}
          {!imageLoaded && !imageError && (
            <img
              src={image}
              alt="preload"
              className="hidden"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </>
      )}

      {/* 이미지가 없거나 로드 실패했을 때 기본 배너 */}
      {(!image || imageError) && !isLoading && (
        <img src={banner} alt="banner" role="img" className="w-full" />
      )}
      {isEdit && (
        <BtnBasic onClick={() => { }} className="p-2.5 absolute top-8 right-16 typo-body2-semibold 
        bg-brand-blue-100 text-color-high w-27.5 h-11 rounded-[8px] shadow-[0_0_4px_0_#CBD5DF]">
          배너 편집
        </BtnBasic>
      )}
    </div>
  );
};

export default Banner;
