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
  title: string; //일정 이름
  date: string; //날짜
  time?: string; //시간
  hasTime: boolean; //하루종일 버튼 체크 여부 false: 하루종일, true: 시간 선택
  color: ColorData;
  sportInfo?: SportInfo; //스포츠 정보
  hashtags?: string[]; //태그
  isSportType: boolean; //스포츠 타입 여부
};
