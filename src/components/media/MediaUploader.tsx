import { useRef, useState, useEffect } from "react";
import ImgUpLoadCard from "../common/Card/ImgUpLoadCard";
import MediaCarousel from "./MediaCarousel";

type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  isRepresentative?: boolean;
};

export default function MediaUploader({
  maxImages = 10,
  maxVideos = 1,
  onChange,
}: {
  maxImages?: number;
  maxVideos?: number;
  onChange?: (items: MediaItem[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 유틸: 항목의 타입을 안전하게 읽음
  const getItemType = (it: any): "image" | "video" | undefined =>
    (it?.type as any) ?? (it?.mediaType as any);

  // 선택 아이템과 대표 여부
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const isSelectedRepresentative = !!selectedItem?.isRepresentative;

  // layout 상수
  const FIXED_WINDOW = 1240; // 전체 고정 영역
  const UPLOAD_CARD_WIDTH = 360; // 업로드 카드 너비
  const GAP = 20;
  const carouselWindowWidth = Math.max(
    360,
    FIXED_WINDOW - UPLOAD_CARD_WIDTH - GAP
  );

  // 이미지 개수와 선택된 항목이 이미지인지 여부
  const imageCount = items.filter((i) => getItemType(i) === "image").length;
  const selectedIsImage = selectedItem
    ? getItemType(selectedItem) === "image"
    : false;

  // items 배열이 바뀔 때 대표 항목이 동영상이면 해제(또는 자동 재할당 로직을 추가할 수 있음)
  useEffect(() => {
    const rep = items.find((i) => i.isRepresentative);
    if (rep && getItemType(rep) !== "image") {
      // 대표가 동영상으로 설정되어 있다면 해제
      const next = items.map((it) => ({ ...it, isRepresentative: false }));
      setItems(next);
      onChange?.(next);
    }
    // 만약 selectedId가 현재 items에 없으면 selectedId 초기화
    if (selectedId && !items.some((i) => i.id === selectedId)) {
      setSelectedId(null);
    }
  }, [items]);

  const openPicker = () => fileInputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const uploads: MediaItem[] = [];
    for (const file of Array.from(files)) {
      const isImage = file.type.startsWith("image/");
      const existingImages = items.filter((i) => i.type === "image").length;
      const newImages = uploads.filter((u) => u.type === "image").length;
      if (isImage && existingImages + newImages >= maxImages) {
        alert(`이미지는 최대 ${maxImages}장까지 등록할 수 있습니다.`);
        continue;
      }

      // 비디오 개수 제한
      const existingVideos = items.filter(
        (i) => getItemType(i) === "video"
      ).length;
      const newVideos = uploads.filter(
        (u) => getItemType(u) === "video"
      ).length;
      if (!isImage && existingVideos + newVideos >= maxVideos) {
        alert(`동영상은 최대 ${maxVideos}개까지 등록할 수 있습니다.`);
        continue;
      }

      const url = URL.createObjectURL(file);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      uploads.push({
        id,
        url,
        type: isImage ? "image" : "video",
        isRepresentative: false,
      });
    }

    let next = [...items, ...uploads];

    // 이미지가 하나뿐이면 그 이미지를 대표로 자동 지정
    const nextImageCount = next.filter(
      (i) => getItemType(i) === "image"
    ).length;
    if (nextImageCount === 1) {
      next = next.map((i) => ({
        ...i,
        isRepresentative: getItemType(i) === "image",
      }));
    }

    setItems(next);
    onChange?.(next);
  };

  const handleRemove = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (target)
      try {
        URL.revokeObjectURL(target.url);
      } catch {}
    let next = items.filter((i) => i.id !== id);

    // 이미지가 하나 남으면 자동 대표 지정
    const imageCountAfter = next.filter(
      (i) => getItemType(i) === "image"
    ).length;
    if (imageCountAfter === 1) {
      next = next.map((i) => ({
        ...i,
        isRepresentative: getItemType(i) === "image",
      }));
    }

    setItems(next);
    if (selectedId === id) setSelectedId(null);
    onChange?.(next);
  };

  const handleSelectCard = (id: string) => {
    setSelectedId((prev) => (prev === id ? prev : id));
  };

  // 체크박스 클릭: 선택된 카드가 대표로 바뀌게 items 갱신
  const handleToggleRepresentative = (checked: boolean) => {
    if (!selectedId) {
      alert("대표로 지정할 이미지를 먼저 클릭해 주세요.");
      return;
    }

    const selected = items.find((i) => i.id === selectedId);
    if (!selected) {
      alert("선택된 항목을 찾을 수 없습니다.");
      return;
    }
    if (getItemType(selected) !== "image") {
      alert("동영상은 대표 이미지로 설정할 수 없습니다.");
      return;
    }

    const next = items.map((i) => ({
      ...i,
      isRepresentative: checked ? i.id === selectedId : false,
    }));
    setItems(next);
    onChange?.(next);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          if (e.target) e.target.value = "";
        }}
      />

      <div className="flex justify-center">
        {/* 고정 영역(1240px) */}
        <div style={{ width: `${FIXED_WINDOW}px` }}>
          <div className="flex items-start" style={{ gap: `${GAP}px` }}>
            {/* 업로드 카드: 고정폭 유지 */}
            <div style={{ width: `${UPLOAD_CARD_WIDTH}px`, flex: "0 0 auto" }}>
              <ImgUpLoadCard onClick={openPicker} />
            </div>

            {/* 캐러셀: 남는 폭만 사용, (버튼은 밖에 absolute로 배치) */}
            <div
              style={{ flex: "1 1 auto", width: `${carouselWindowWidth}px` }}
            >
              {items.length > 0 && (
                <MediaCarousel
                  items={items}
                  onRemove={handleRemove}
                  onCardClick={handleSelectCard}
                  selectedId={selectedId}
                  cardWidth={360}
                  gap={GAP}
                  windowWidth={carouselWindowWidth}
                  prevOffset={-450}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 typo-caption text-color-high">
        사진은 최대 {maxImages}장까지 등록할 수 있어요. (예 : 권장사이즈
        360*180)
      </div>

      {/* 대표 체크박스: 이미지 2장 이상일 때만 보임 */}
      {imageCount >= 2 && selectedIsImage && (
        <div className="mt-3 flex items-center typo-body1 text-color-highest">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isSelectedRepresentative}
              onChange={(e) => handleToggleRepresentative(e.target.checked)}
              className="size-6 appearance-none rounded-sm bg-low
              checked:bg-primary checked:bg-[url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/checkbox.png')]
              bg-md bg-no-repeat bg-center "
            />
            <span>대표 이미지로 설정</span>
          </label>
        </div>
      )}
    </div>
  );
}
