export type ColorData = {
  color: string;
};

const colors: ColorData[] = [
  { color: "#FFDFE7" }, //핑크
  { color: "#FFABAB" }, //빨강
  { color: "#FFDEBF" }, //오렌지
  { color: "#FFEEBB" }, //노랑
  { color: "#CEEBCC" }, //초록
  { color: "#82BEF5" }, //파랑
  { color: "#DFDFFF" }, //보라
  { color: "#DFDCDC" }, //회색
];

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

const defaultLabelData: LabelData[] = [
  {
    title: "야구경기 관람",
    date: "2026-01-03",
    hasTime: false,
    color: colors[0],
    sportInfo: {
      team1: "한화 이글스",
      team2: "두산 베어스",
      score1: 5,
      score2: 3,
    },
    hashtags: ["야구", "한화 이글스", "두산 베어스"],
    isSportType: true,
  },
  {
    title: "야구경기 관람",
    date: "2026-01-04",
    time: "19:00",
    hasTime: true,
    color: colors[2],
    sportInfo: {
      team1: "한화 이글스",
      team2: "LG 트윈스",
      score1: 5,
      score2: 3,
    },
    hashtags: ["야구", "한화 이글스", "LG 트윈스"],
    isSportType: true,
  },

  {
    date: "2026-01-04",
    title: "콘서트 관람",
    hasTime: false,
    color: colors[1],
    hashtags: ["콘서트", "라이브", "블랙핑크"],
    isSportType: false,
  },
  {
    date: "2026-01-04",
    title: "콘서트 관람",
    hasTime: false,
    color: colors[1],
    hashtags: ["콘서트", "라이브", "블랙핑크"],
    isSportType: false,
  },
  {
    date: "2026-01-04",
    title: "콘서트 관람",
    hasTime: false,
    color: colors[1],
    hashtags: ["콘서트", "라이브", "블랙핑크"],
    isSportType: false,
  },
  {
    date: "2026-01-05",
    title: "콘서트 관람",
    time: "18:00",
    hasTime: true,
    color: colors[5],
    hashtags: ["콘서트", "라이브", "블랙핑크", "아이돌"],
    isSportType: false,
  },
  {
    date: "2026-01-06",
    title: "데이트",
    time: "21:00",
    hasTime: true,
    color: colors[3],
    hashtags: ["데이트", "커플"],
    isSportType: true,
  },
];

const defaultStickerData: Record<string, string> = {
  "2026-01-01": "sticker",
  "2026-01-02": "sticker",
  "2026-01-03": "sticker",
  "2026-01-04": "sticker",
  "2026-01-05": "sticker",
  "2026-01-06": "sticker",
  "2026-01-07": "sticker",
  "2026-01-08": "sticker",
  "2026-01-09": "sticker",
};

export {
  defaultLabelData as labelDataMock,
  defaultStickerData as stickerDataMock,
  colors,
};
