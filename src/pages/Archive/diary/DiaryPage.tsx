import EmptyList from "@/components/archive/Empty/EmptyList";
import DiaryList from "@/components/archive/List/DiaryList";
import { BtnIcon } from "@/components/common/Button/Btn";
import { diaryDataMock } from "@/mockData/diaryData";
import { Pencil, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DiaryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const diary = diaryDataMock.filter(
    (diary) => diary.archiveId === Number(params.id)
  );
  console.log("diary", diary);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[1920px] mx-auto flex flex-col items-start mt-[60px] gap-[60px]">
        <div className="w-310 flex flex-col gap-15">
          <p className="w-full typo-h1 text-color-highest">일기 제목</p>

          {/* ✅ 다이어리 리스트 렌더링 */}
          {diary.length > 0 ? (
            <div className="w-full max-h-255 flex flex-col">
              {/* 일기 추가 & 편집 버튼 */}
              <div className="w-full flex justify-end pb-10 gap-4">
                <BtnIcon
                  startIcon={<Plus className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    if (params.id) {
                      navigate(`/archive/${params.id}/diary/new`);
                    }
                  }}
                >
                  일기 추가
                </BtnIcon>
                <BtnIcon
                  startIcon={<Pencil className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    if (params.id) {
                      navigate(`/archive/${params.id}/diary/edit`);
                    }
                  }}
                >
                  편집 하기
                </BtnIcon>
              </div>
              <DiaryList diary={diary} />
            </div>
          ) : (
            <EmptyList
              title="일기 추가"
              description="아직 작성된 일기가 없어요."
              className="w-full h-135"
              onClick={() => {
                if (params.id) {
                  navigate(`/archive/${params.id}/diary/new`);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
