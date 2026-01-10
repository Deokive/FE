// src/pages/GalleryPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import EmptyList from "@/components/archive/Empty/EmptyList";
import EditableTitle from "@/components/common/EditableTitle";
import { BtnIcon } from "@/components/common/Button/Btn";
import Pagination from "@/components/common/Pagination";
import CheckboxIcon from "@/assets/Icon/CheckboxIcon";
import ImgCard from "@/components/common/Card/ImgCard";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Pencil, SquareX, Camera } from "lucide-react";
import TrashIcon from "@/assets/Icon/TrashIcon";

type Photo = {
  id: string;
  url: string;
  fileName?: string;
  createdAt?: string;
};

const PER_PAGE = 9;
const MAX_UPLOAD = 20;

export default function Gallery() {
  const [title, setTitle] = useState<string>("갤러리명 (사용자 지정)");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 생성한 blob URL 추적용(언마운트 시 revoke)
  const createdUrlsRef = useRef<Set<string>>(new Set());

  // 갤러리명 저장
  const handleSaveName = (nextName: string) => {
    setTitle(nextName);
    // TODO: API 연동 시 서버에 갤러리명 저장
  };

  // pagination 계산
  const totalPages = Math.max(1, Math.ceil(photos.length / PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const currentPhotos = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return photos.slice(start, start + PER_PAGE);
  }, [photos, page]);

  // 파일 입력 트리거
  const onClickAddPhotos = () => {
    fileInputRef.current?.click();
  };

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArr = Array.from(files).slice(0, MAX_UPLOAD);
    const newPhotos: Photo[] = fileArr.map((f) => {
      const url = URL.createObjectURL(f);
      createdUrlsRef.current.add(url);
      return {
        id: uuidv4(),
        url,
        fileName: f.name,
        createdAt: dayjs().toISOString(),
      };
    });

    // TODO: 서버 업로드 로직 추가
    setPhotos((prev) => {
      const merged = [...newPhotos, ...prev];
      return merged;
    });

    e.currentTarget.value = "";
    setPage(1);
  };

  // 체크 토글
  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedMap((prev) => ({ ...prev, [id]: checked }));
  };

  // 체크된 id 배열
  const checkedIds = useMemo(
    () => Object.keys(checkedMap).filter((k) => checkedMap[k]),
    [checkedMap]
  );

  // 삭제
  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) {
      alert("삭제할 사진을 선택하세요.");
      return;
    }
    if (!confirm(`${checkedIds.length}개의 사진을 삭제하시겠어요?`)) return;

    // TODO: 서버 연동 시 서버에 삭제 요청 후 성공 시 상태 갱신
    setPhotos((prev) => prev.filter((p) => !checkedIds.includes(p.id)));

    // 초기화 / 편집 모드 종료
    setCheckedMap({});
    setIsEditing(false);
    // 페이지 보정 (사진 수가 줄어들어 현재 페이지가 초과되면 useEffect가 처리)
  };

  // 페이지 이동
  const loadPage = (p: number) => {
    const totalItems = photos.length;
    const totalPagesLocal = Math.max(1, Math.ceil(totalItems / PER_PAGE));
    const next = Math.max(1, Math.min(totalPagesLocal, p));
    setPage(next);
    // setCheckedMap({}); // 페이지 이동 시 선택 초기화
  };

  // 컴포넌트 언마운트 시 생성한 blob URL 해제
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdUrlsRef.current.clear();
    };
  }, []);
  // 빈 상태 렌더링
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-310">
          <div className="my-15 ">
            <EditableTitle
              value={title}
              onSave={handleSaveName}
              placeholder="갤러리명을 입력하세요."
              maxLength={50}
            />
          </div>
          <EmptyList
            title="사진 추가"
            description="사진을 추가해서 덕질 기록을 남겨보세요."
            onClick={onClickAddPhotos}
            startIcon={<Camera className="w-6 h-6 text-color-high" />}
            className="w-full h-135"
          />
          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onFilesSelected}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  // non-empty (사진이 있을 때)
  return (
    <div className="flex flex-col items-center">
      <div className="w-310">
        <div className="my-15">
          <EditableTitle value={title} onSave={handleSaveName} />
        </div>
        {photos.length > 0}
        <div className="flex justify-end gap-5 mb-10">
          {!isEditing && (
            <BtnIcon
              onClick={onClickAddPhotos}
              startIcon={<Camera className="size-6 text-color-high" />}
            >
              사진 추가
            </BtnIcon>
          )}
          {isEditing && (
            <BtnIcon
              onClick={handleDeleteSelected}
              startIcon={<TrashIcon className="w-6 h-6 text-color-high" />}
            >
              삭제하기
            </BtnIcon>
          )}
          <BtnIcon
            onClick={() => {
              setIsEditing((s) => {
                const next = !s;
                if (!next) setCheckedMap({});
                return next;
              });
            }}
            startIcon={
              isEditing ? (
                <SquareX className="size-6 text-color-high" />
              ) : (
                <Pencil className="w-[16.5px] h-[17.5px] text-color-high" />
              )
            }
          >
            {isEditing ? "취소하기" : "편집하기"}
          </BtnIcon>
        </div>
      </div>

      {/* 이미지 그리드 (3열 x 3행) */}
      <div className="grid grid-cols-3 gap-x-20 gap-y-15 mb-15 w-310">
        {currentPhotos.map((p) => (
          <div key={p.id} className="relative group">
            <div className="w-90 h-75 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={p.url}
                alt={p.fileName ?? "photo"}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 편집 체크박스*/}
            {isEditing && (
              <label className="absolute left-3 top-3">
                <input
                  type="checkbox"
                  checked={!!checkedMap[p.id]}
                  onChange={(e) => toggleCheck(p.id, e.target.checked)}
                  className="sr-only"
                  aria-label={checkedMap[p.id] ? "선택 해제" : "선택"}
                />
                <div>
                  <CheckboxIcon checked={!!checkedMap[p.id]} size={24} />
                </div>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* 페이징 & 상태 표시 */}
      <div className="flex justify-center mb-12">
        <Pagination
          totalItems={photos.length}
          pageSize={PER_PAGE}
          visiblePages={5}
          currentPage={page}
          onChange={(p) => loadPage(p)}
        />
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFilesSelected}
        className="hidden"
      />
    </div>
  );
}
