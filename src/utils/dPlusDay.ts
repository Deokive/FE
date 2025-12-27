// src/utils/dPlusDay.ts
// 현재 날짜에서 생성된 날짜를 빼서 일수 차이를 반환
const getDPlusDay = (dateString: string) => {
  const today = new Date();
  const created = new Date(dateString);

  // 시, 분, 초를 0으로 초기화하여 순수 날짜 차이만 계산
  today.setHours(0, 0, 0, 0);
  created.setHours(0, 0, 0, 0);

  const diffInMs = today.getTime() - created.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // 일수만 반환
  return diffInDays;
};

export default getDPlusDay;
