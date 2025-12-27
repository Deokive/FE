import banner from "@/assets/images/banner.png";

export const feedDataMock = [
  {
    id: 1,
    title: "나의 첫 아카이브",
    visibility: "PUBLIC",
    badge: "NEWBIE",
    bannerUrl: banner,
    image: "https://picsum.photos/201/300",
    viewCount: 150,
    likeCount: 42,
    ownerNickname: "홍길동",
    createdAt: "2025-12-23 10:00:00",
    owner: true,
    liked: true,
  },
  { id: 2, image: "", title: "빈 이미지 1" },
  {
    id: 3,
    image: "https://picsum.photos/202/300",
    title: "랜덤 이미지 2",
  },
  {
    id: 4,
    image: "https://picsum.photos/203/300",
    title: "랜덤 이미지 3",
  },
  { id: 5, image: "", title: "빈 이미지 2" },
  {
    id: 6,
    image: "https://picsum.photos/204/300",
    title: "랜덤 이미지 4",
  },
  { id: 7, image: "", title: "빈 이미지 3" },
  { id: 8, image: "", title: "빈 이미지 4" },
  { id: 9, image: "", title: "빈 이미지 5" },
  { id: 10, image: "", title: "빈 이미지 6" },
];
