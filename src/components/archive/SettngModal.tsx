// src/components/archive/SettngModal.tsx
import { useState } from "react";
import RadioButton from "../common/Button/RadioButton";
import { BtnBasic } from "../common/Button/Btn";
import { friendListMock } from "@/mockData/friendList";
import CheckboxIcon from "@/assets/Icon/CheckboxIcon";

type PrivacyOption = "public" | "partial" | "private";

const SettngModal = () => {
  const [privacy, setPrivacy] = useState<PrivacyOption>("public");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  // 친구 선택/해제 핸들러 => 실제로는 API 호출로 대체
  const handleFriendClick = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <div
      className="w-75 px-10 pt-8 pb-6 flex flex-col gap-8 items-start bg-surface-bg rounded-lg shadow-2xl z-50"
      onClick={(e) => {
        e.stopPropagation(); // 모달 클릭 시 이벤트 전파 방지
      }}
    >
      {/* 공개 기준 설정 */}
      <div className="w-55 flex flex-col items-start gap-4">
        <p className="typo-h2-semibold text-color-highest">공개 기준 설정</p>
        <div className="w-full flex flex-col gap-4">
          <RadioButton
            label="전체 공개"
            checked={privacy === "public"}
            onClick={() => {
              setPrivacy("public");
              console.log("전체 공개");
            }}
          />
          <RadioButton
            label="부분 공개"
            checked={privacy === "partial"}
            onClick={() => {
              setPrivacy("partial");
              console.log("부분 공개");
            }}
            showDropdown={true}
            isDropdownOpen={isDropdownOpen}
            onDropdownClick={() => setIsDropdownOpen((prev) => !prev)}
          />
          {isDropdownOpen && (
            <div
              className="h-22 w-full flex flex-col gap-3 overflow-y-auto rounded-lg bg-surface-bg"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {friendListMock.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => handleFriendClick(friend.id)}
                  className="flex items-center h-5 pl-7 cursor-pointer"
                >
                  <CheckboxIcon
                    checked={selectedFriends.includes(friend.id)}
                    size={20}
                  />
                  <span className="typo-body2 text-color-high">
                    {friend.nickname}
                  </span>
                </div>
              ))}
            </div>
          )}
          <RadioButton
            label="비공개"
            checked={privacy === "private"}
            onClick={() => {
              setPrivacy("private");
              console.log("비공개");
            }}
          />
        </div>
      </div>
      {/* 아카이브 삭제 */}
      <div className="flex flex-col items-start gap-2.5 ">
        <p className="typo-h2-semibold text-color-highest pb-4">
          아카이브 삭제
        </p>
        <BtnBasic
          variant="gray"
          onClick={() => {
            console.log("삭제하기");
          }}
          className="w-55 bg-surface-container-30"
        >
          삭제하기
        </BtnBasic>
        <BtnBasic
          variant="gray"
          onClick={() => {
            console.log("취소하기");
          }}
          className="w-55"
        >
          취소하기
        </BtnBasic>
      </div>
    </div>
  );
};

export default SettngModal;
