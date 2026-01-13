import React, { useEffect, useMemo, useState } from "react";
import BackNavigator from "@/components/common/BackNavigator";
import RequiredLabel from "@/components/common/Form/RequiredLabel";
import TextField from "@/components/common/Form/TextField";
import MediaUploader from "@/components/media/MediaUploader";
import CommunityTab from "@/components/community/CommunityTab";
import { BtnBasic } from "@/components/common/Button/Btn";
import { useNavigate } from "react-router-dom";

export default function CommunityWrite() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("");
  const [mediaItems, setMediaItems] = useState<any[]>([]);

  // 에러 상태
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const TITLE_MAX = 50;
  const CONTENT_MAX = 5000;

  // 실시간 검증 (타이핑할 때마다)
  useEffect(() => {
    if (title.length > TITLE_MAX) {
      setTitleError("제목은 최대 50자까지 작성할 수 있어요.");
    } else {
      setTitleError(null);
    }
  }, [title]);

  useEffect(() => {
    if (content.length > CONTENT_MAX) {
      setContentError("본문은 최대 5,000자까지 작성할 수 있어요.");
    } else {
      setContentError(null);
    }
  }, [content]);

  // 다른 필수 체크
  const isCategoryValid = category !== "" && category !== "all";
  const isMediaValid = useMemo(() => {
    if (!mediaItems || mediaItems.length === 0) return false;

    // 안전한 필드명 추출
    const normalized = mediaItems.map((m) => ({
      ...m,
      _type: (m as any).type ?? (m as any).mediaType,
      _isRep: !!(m as any).isRepresentative,
    }));

    // 최소 하나의 이미지가 있어야 함
    const hasImage = normalized.some((m) => m._type === "image");
    if (!hasImage) return false;

    // 아이템이 하나뿐이면 (이미지 한 장) 유효
    if (normalized.length === 1) return normalized[0]._type === "image";

    // 복수 아이템이면 대표 이미지가 지정되어야 유효
    return normalized.some((m) => m._isRep && m._type === "image");
  }, [mediaItems]);

  const isTitleValid = useMemo(
    () => title.trim().length > 0 && title.length <= TITLE_MAX,
    [title]
  );
  const isContentValid = useMemo(
    () => content.trim().length > 0 && content.length <= CONTENT_MAX,
    [content]
  );

  // 전체 폼 유효성: 모든 필드가 유효하고 에러가 없을 때만 true
  const isFormValid = useMemo(() => {
    return (
      isTitleValid &&
      isContentValid &&
      !titleError &&
      !contentError &&
      isCategoryValid &&
      isMediaValid
    );
  }, [
    isTitleValid,
    isContentValid,
    titleError,
    contentError,
    isCategoryValid,
    isMediaValid,
  ]);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    const mediaIds = mediaItems.map((m) => m.serverId).filter(Boolean);
    const payload = { title, content, category, mediaIds };
    try {
      // await api.createCommunityPost(payload);
      console.log("submit", payload);
      navigate("/community");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <BackNavigator label="커뮤니티 보기" onClick={() => history.back()} />
      </div>
      <div className="flex justify-center">
        <div className="max-w-310 flex flex-col gap-10">
          <div>
            <RequiredLabel required>미디어</RequiredLabel>
            <MediaUploader onChange={(items) => setMediaItems(items)} />
          </div>

          <div>
            <RequiredLabel required>카테고리</RequiredLabel>
            <CommunityTab value={category} onChange={setCategory} hideAll />
          </div>

          <div>
            <RequiredLabel required>제목</RequiredLabel>
            <TextField
              id="post-title"
              value={title}
              onChange={setTitle}
              placeholder="커뮤니티 게시물의 제목을 작성해주세요."
              maxLength={TITLE_MAX}
              showCount
              multiline={false}
              error={titleError}
            />

            {/* 제목 에러 문구 */}
            <div aria-live="polite">
              {titleError ? (
                <p className="typo-caption mt-3 text-[#FF0000]">{titleError}</p>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div>
            <RequiredLabel required>내용</RequiredLabel>
            <TextField
              id="post-content"
              value={content}
              onChange={setContent}
              placeholder="기록하고 싶은 활동과 순간을 남겨보세요."
              maxLength={5000}
              showCount
              multiline
              rows={12}
              error={contentError}
            />

            {/* 본문 에러 문구 */}
            <div aria-live="polite">
              {contentError ? (
                <p className="typo-caption mt-3 text-[#FF0000]">
                  {contentError}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <BtnBasic variant="gray" onClick={() => navigate(-1)}>
              취소
            </BtnBasic>
            <BtnBasic
              variant={isFormValid ? "blue" : "gray"}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              등록
            </BtnBasic>
          </div>
        </div>
      </div>
    </div>
  );
}
