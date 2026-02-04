import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EmptyList from "@/components/archive/Empty/EmptyList";
import EditableTitle from "@/components/common/EditableTitle";
import { BtnIcon } from "@/components/common/Button/Btn";
import Pagination from "@/components/common/Pagination";
import CheckboxIcon from "@/assets/icon/CheckboxIcon";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Pencil, X, Camera } from "lucide-react";
import TrashIcon from "@/assets/icon/TrashIcon";
import { useFileUpload } from "@/hooks/useFileUpload";

import { useGetGallery } from "@/apis/queries/gallery/useGetGallery";
import { useDeleteGallery } from "@/apis/mutations/gallery/useDeleteGallery";
import { usePatchGalleryTitle } from "@/apis/mutations/gallery/usePatchGalleryTitle";
import { usePostGallery } from "@/apis/mutations/gallery/usePostGallery";

type Photo = {
  id: string;
  url: string;
  fileName?: string;
  createdAt?: string;
  isNew?: boolean;
};

const PER_PAGE = 9;
const MAX_UPLOAD = 10;

export default function Gallery() {
  const { archiveId: archiveIdParam } = useParams<{ archiveId: string }>();
  const archiveId = archiveIdParam ? archiveIdParam : undefined;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [title, setTitle] = useState<string>("갤러리명 (사용자 지정)");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [, setPhotos] = useState<Photo[]>([]);

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdUrlsRef = useRef<Set<string>>(new Set());
  const tmpMappingRef = useRef<Record<string, number | null>>({}); // 필요 시 사용
  const [, setIsUploadingFiles] = useState(false);
  const { uploadFiles } = useFileUpload();

  // React Query 훅들
  const { data, isLoading, isError, refetch } = useGetGallery({
    archiveId: archiveId ?? "",
    page: Math.max(0, page - 1),
    size: PER_PAGE,
  });

  const deleteGallery = useDeleteGallery();
  const patchGalleryTitle = usePatchGalleryTitle();
  const postGallery = usePostGallery();

  // 서버 응답 기반 photos, total
  const photosFromServer: Photo[] =
    (data?.content ?? []).map((it: any) => ({
      id: String(it.id ?? it.fileId ?? uuidv4()),
      url: it.thumbnailUrl ?? (it.originalUrl as string | undefined) ?? "",
      fileName: it.fileName ?? undefined,
      createdAt: it.createdAt ?? undefined,
      isNew: false,
    })) ?? [];

  const totalElements = Number(
    data?.page?.totalElements ?? photosFromServer.length
  );
  const totalPages = Math.max(1, Math.ceil(totalElements / PER_PAGE));

  const serverCount = Number(data?.content?.length ?? 0);

  // EditableTitle 초기값 동기화 (첫 로드 시만)
  useEffect(() => {
    if (data?.title && title === "갤러리명 (사용자 지정)") {
      setTitle(data.title);
    }
  }, [data?.title]);

  // 페이지 변경 핸들러
  const loadPage = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setSearchParams({ page: String(next) });
    // 검색파라미터 변경에 의해 useGetGallery가 자동으로 refetch
  };

  // 현재 페이지에 해당하는 photos
  const currentPhotos = useMemo(() => {
    return photosFromServer;
  }, [photosFromServer]);

  // 체크 토글
  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedMap((prev) => ({ ...prev, [id]: checked }));
  };

  const checkedIds = useMemo(
    () => Object.keys(checkedMap).filter((k) => checkedMap[k]),
    [checkedMap]
  );

  // 제목 저장 (patch)
  const handleSaveName = async (nextName: string) => {
    setTitle(nextName);
    if (!archiveId) return;

    try {
      await patchGalleryTitle.mutateAsync({
        archiveId,
        payload: { title: nextName },
      });
      refetch();
    } catch (e) {
      console.error("제목 수정 실패:", e);
    }
  };

  // 삭제 처리
  const handleDeleteSelected = async () => {
    if (checkedIds.length === 0) {
      alert("삭제할 사진을 선택하세요.");
      return;
    }
    if (!confirm(`${checkedIds.length}개의 사진을 삭제하시겠어요?`)) return;
    if (!archiveId) {
      alert("아카이브 정보가 없습니다.");
      return;
    }

    setIsUploading(true);
    try {
      const galleryIds = checkedIds
        .map((id) => {
          const n = Number(id);
          return Number.isFinite(n) ? n : undefined;
        })
        .filter((v): v is number => typeof v === "number");

      await deleteGallery.mutateAsync({
        archiveId,
        payload: { galleryIds },
      });

      // 성공 시 checkedMap 초기화, 편집 모드 종료, 현재 페이지 재조회
      setCheckedMap({});
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error("갤러리 삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 입력 트리거
  const onClickAddPhotos = () => {
    fileInputRef.current?.click();
  };

  const onFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList).slice(0, MAX_UPLOAD);
    if (files.length > MAX_UPLOAD) {
      alert(
        `한 번에 최대 ${MAX_UPLOAD}장만 업로드할 수 있습니다. 처음 ${MAX_UPLOAD}장만 처리됩니다.`
      );
    }
    if (!archiveId) {
      alert("아카이브 정보가 없습니다.");
      e.currentTarget.value = "";
      return;
    }

    // 1) 로컬 미리보기용 tmpItems 생성 (append 방식)
    const tmpItems: Photo[] = files.map((f) => {
      const tmpId = `tmp-${uuidv4()}`;
      const blobUrl = URL.createObjectURL(f);
      createdUrlsRef.current.add(blobUrl);
      tmpMappingRef.current[tmpId] = null; // 아직 서버 fileId 없음
      return {
        id: tmpId,
        url: blobUrl,
        fileName: f.name,
        createdAt: dayjs().toISOString(),
        isNew: true,
      };
    });

    // 옵티미스틱 처리
    setPhotos((prev) => [...prev, ...tmpItems]);
    setIsUploadingFiles(true);
    setIsUploading(true);

    try {
      // 2) 병렬 업로드
      const uploadResults = await uploadFiles({
        files,
        mediaRole: "CONTENT" as any,
      });
      if (!uploadResults)
        throw new Error("파일 업로드 중 일부 실패 또는 응답 없음");

      // 3) uploadResults -> fileIds 추출 및 tmp 매핑
      const fileIds: number[] = [];
      uploadResults.forEach((r, idx) => {
        const tmp = tmpItems[idx];
        const fid = typeof r.fileId === "number" ? r.fileId : Number(r.fileId);
        if (tmp && Number.isFinite(fid)) {
          tmpMappingRef.current[tmp.id] = fid;
          fileIds.push(fid);
          // 업로드 단계에서 cdnUrl이 바로 있으면 tmp 항목 URL 교체
          if (r.cdnUrl) {
            setPhotos((prev) =>
              prev.map((p) => (p.id === tmp.id ? { ...p, url: r.cdnUrl } : p))
            );
            // blob revoke
            try {
              URL.revokeObjectURL(tmp.url);
              createdUrlsRef.current.delete(tmp.url);
            } catch {}
          }
        }
      });

      if (fileIds.length === 0)
        throw new Error("서버에서 유효한 fileId를 받지 못했습니다.");

      // 4) 서버에 등록 (postGallery)
      await postGallery.mutateAsync({
        archiveId,
        payload: { fileIds },
      });

      // 5) 성공: 서버에서 변경된 목록을 fetch (refetch)
      await refetch();

      // 6) 서버 응답으로 최종 URL이 준비되지 않았더라도, 다음 페이지 전환 시 서버에서 준비된 썸네일을 불러옴
    } catch (err: any) {
      console.error("업로드/등록 실패:", err);
      alert(
        err?.response?.data?.message ??
          err?.message ??
          "이미지 업로드 또는 등록 중 오류가 발생했습니다."
      );

      // 실패 시 임시 항목 제거(롤백)
      setPhotos((prev) => prev.filter((p) => !p.isNew));

      // revoke blob URLs
      tmpItems.forEach((t) => {
        try {
          if (t.url.startsWith("blob:")) {
            URL.revokeObjectURL(t.url);
            createdUrlsRef.current.delete(t.url);
          }
        } catch {}
      });
    } finally {
      setIsUploadingFiles(false);
      setIsUploading(false);
      e.currentTarget.value = "";
      // clear tmp mapping (등록 성공 시 server data를 통해 정리됨)
      tmpItems.forEach((t) => delete tmpMappingRef.current[t.id]);
    }
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

  // 로딩/에러 UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-310">
          <div className="my-15 ">
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="mt-5 mb-15">
            {/* 간단한 빈 자리 표시 */}
            <div className="grid grid-cols-3 gap-x-20 gap-y-15 w-310">
              {Array.from({ length: PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="w-90 h-75 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) return <div>갤러리 로드 중 오류가 발생했습니다.</div>;

  if (serverCount === 0) {
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

          {/* 숨겨진 파일 input은 항상 DOM에 있음 */}
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
        <div className="flex justify-end gap-5 mb-10">
          {!isEditing && (
            <BtnIcon
              onClick={onClickAddPhotos}
              startIcon={<Camera className="size-6 text-color-high" />}
              disabled={isUploading}
              className={isUploading ? "opacity-60 cursor-not-allowed" : ""}
            >
              {isUploading ? "업로드 중..." : "사진 추가"}
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
                <X className="size-6 text-color-high" />
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
                className="object-cover w-full h-full "
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
          totalItems={totalElements}
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
