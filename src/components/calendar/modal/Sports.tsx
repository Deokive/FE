import { X } from "lucide-react";
import CalendarDate from "../CalendarDate";
import CalendarTag from "../CalendarTag";
import ColorChange from "@/components/common/ColorChange";
import { BtnBasic } from "@/components/common/Button/Btn";
import { useState } from "react";
import type { ColorData, DateData } from "@/types/calendar";

type SportsProps = {
  onClose: () => void;
  startDate: Date | null;
};

type ScoreData = {
  teamName: string;
  score: number;
  teamName2: string;
  score2: number;
};

const Sports = ({ onClose, startDate }: SportsProps) => {
  // 자식 컴포넌트들의 데이터를 저장할 state
  const [dateData, setDateData] = useState<DateData>({
    startDate: startDate,
    endDate: null,
    isAllDay: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState<ColorData>(null);
  const [scoreData, setScoreData] = useState<ScoreData>({
    teamName: "",
    score: 0,
    teamName2: "",
    score2: 0,
  });

  // 실제 API 연결 로직 추가
  const handleConfirm = () => {
    console.log("========== 스포츠 결과 정보 ==========");
    console.log("일정 시작:", dateData.startDate);
    console.log("일정 종료:", dateData.endDate);
    console.log("하루 종일:", dateData.isAllDay);
    console.log("태그:", tags);
    console.log("색상:", color);
    console.log("경기결과:", scoreData);
    console.log("================================");
    onClose();
  };

  return (
    <div className="flex flex-col gap-12 items-start">
      {/* 일정 이름 */}
      <div className="w-full flex items-center justify-between">
        <p className="typo-h1 text-color-highest text-left">스포츠 결과 기록</p>
        <X
          className="w-12 h-12 text-color-highest cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 일정 기간 */}
      <CalendarDate startDateValue={startDate} onDateChange={setDateData} />
      {/* 태그 설정 */}
      <CalendarTag onTagChange={(data) => setTags(data.tags)} />
      {/* 색상설정 */}
      <ColorChange onColorChange={(data) => setColor(data || null)} />
      {/* 경기결과 */}
      <div className="w-165 flex gap-5 items-center">
        <p className="typo-h2-semibold text-color-highest">경기결과</p>
        {/* 스코어 기록 칸 */}
        <div className="h-10 flex items-center gap-4 justify-center">
          {/* 팀이름 */}
          <input
            className="w-30 h-10 p-2.5 typo-body1 text-color-highest 
            placeholder:text-color-mid border-2 border-border-mid rounded-lg text-center"
            placeholder="팀 이름"
            value={scoreData.teamName}
            onChange={(e) =>
              setScoreData({ ...scoreData, teamName: e.target.value })
            }
          />
          {/* 스코어 */}
          <input
            className="w-[70px] h-10 p-2.5 typo-body1 text-color-highest 
            placeholder:text-color-mid border-2 border-border-mid rounded-lg text-center"
            placeholder="스코어"
            value={scoreData.score}
            onChange={(e) =>
              setScoreData({ ...scoreData, score: parseInt(e.target.value) })
            }
          />
          {/* : */}
          <p className="typo-body1 text-color-high">:</p>
          {/* 스코어 */}
          <input
            className="w-[70px] h-10 p-2.5 typo-body1 text-color-highest 
            placeholder:text-color-mid border-2 border-border-mid rounded-lg text-center"
            placeholder="스코어"
            value={scoreData.score2}
            onChange={(e) =>
              setScoreData({ ...scoreData, score2: parseInt(e.target.value) })
            }
          />
          {/* 팀이름 */}
          <input
            className="w-30 h-10 p-2.5 typo-body1 text-color-highest 
            placeholder:text-color-mid border-2 border-border-mid rounded-lg text-center"
            placeholder="팀 이름"
            value={scoreData.teamName2}
            onChange={(e) =>
              setScoreData({ ...scoreData, teamName2: e.target.value })
            }
          />
        </div>
      </div>
      {/* 확인버튼 */}
      <div className="w-full flex justify-end">
        <BtnBasic onClick={handleConfirm}>확인</BtnBasic>
      </div>
    </div>
  );
};

export default Sports;
