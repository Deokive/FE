export type EventProps = {
  onClose: () => void;
  startDate: Date | null;
};

export type DateData = {
  startDate: Date | null;
  endDate: Date | null;
  isAllDay: boolean;
};

export type ColorData = {
  color: string;
};

export type SportInfo = {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
};

export type LabelData = {
  id: number;
  title: string;
  date: string;
  time?: string;
  hasTime: boolean; //하루종일 버튼 체크 여부 false: 하루종일, true: 시간 선택
  color: string;
  isSportType?: boolean; //생성할 때 스포츠 타입 여부 true: 스포츠, false: 일반
  sportInfo?: SportInfo; //스포츠 정보
  hashtags?: string[]; //태그
};

// 이벤트 목록, 조회 응답
export type EventResponse = {
  id: number;
  title: string;
  date: string;
  time?: string;
  hasTime: boolean; //하루종일 버튼 체크 여부 false: 하루종일, true: 시간 선택
  color: string;
  isSportType?: boolean; //생성할 때 스포츠 타입 여부 true: 스포츠, false: 일반
  sportInfo?: SportInfo; //스포츠 정보
  hashtags?: string[]; //태그
}