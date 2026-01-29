import banner from "@/assets/images/banner.png";
import { diaryDataMock } from "./diaryData";
import { galleryDataMock } from "./galleryData";
import { ticketDataMock } from "./ticketData";
import { repostDataMock } from "./repostData";

export const archiveDataMock = [
  {
    archiveId: 1,
    userId: 1,
    title: "나의 첫 아카이브",
    bannerUrl: banner,
    image: "https://picsum.photos/201/300",
    viewCount: 150,
    likeCount: 42,
    visibility: "PUBLIC",
    createdAt: "2025-01-01T00:00:00.000Z",
    lastModifiedAt: "KST Datetime",
    ownerNickname: "홍길동",
    badge: "덕카이브",
    liked: false,
    Diary: diaryDataMock.filter((diary) => diary.archiveId === 1) ?? [],
    Gallery: galleryDataMock.filter((gallery) => gallery.archiveId === 1) ?? [],
    Ticket: ticketDataMock.filter((ticket) => ticket.archiveId === 1) ?? [],
    Repost: repostDataMock.filter((repost) => repost.archiveId === 1) ?? [],
  },
  {
    archiveId: 2,
    userId: 1,
    title: "나의 두번째 아카이브",
    bannerUrl: "https://picsum.photos/1920/200",
    image: "https://picsum.photos/202/300",
    viewCount: 150,
    likeCount: 41,
    visibility: "PUBLIC",
    createdAt: "2025-01-01T00:00:00.000Z",
    lastModifiedAt: "KST Datetime",
    ownerNickname: "홍길동",
    badge: "덕카이브",
    liked: false,
    Diary: diaryDataMock.filter((diary) => diary.archiveId === 2) ?? [],
    Gallery: galleryDataMock.filter((gallery) => gallery.archiveId === 2) ?? [],
    Ticket: ticketDataMock.filter((ticket) => ticket.archiveId === 2) ?? [],
    Repost: repostDataMock.filter((repost) => repost.archiveId === 2) ?? [],
  },

];
