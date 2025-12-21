import React, { useRef, useState, useEffect } from "react";
import TrashIcon from "../../assets/Icon/TrashIcon";
import ExclamationIcon from "../../assets/Icon/ExclamationIcon";
import { BtnBasic } from "@/components/common/Button/Btn"; // 실제 경로에 따라 조정
import clsx from "clsx";

type Props = {
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  // controlled 모드 지원(optional)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export default function DeleteCommentModal({
  onConfirm,
  confirmLabel = "확인",
  cancelLabel = "취소",
  open: controlledOpen,
  onOpenChange,
  className,
}: Props) {
  const [open, setOpen] = useState<boolean>(controlledOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isControlled) setOpen(Boolean(controlledOpen));
  }, [controlledOpen, isControlled]);

  useEffect(() => {
    // 모달 오픈 시 ESC로 닫기
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    // 모달 열리면 취소 버튼에 포커스(간단한 포커스 관리)
    if (open) {
      setTimeout(() => cancelRef.current?.focus(), 0);
    }
  }, [open]);

  const setOpenInternal = (val: boolean) => {
    if (isControlled) {
      onOpenChange?.(val);
    } else {
      setOpen(val);
    }
  };

  const handleOpen = () => setOpenInternal(true);
  const handleClose = () => setOpenInternal(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      {/* Trash 버튼: 댓글 마크업 안 만들어도 이것만 클릭하면 모달 나옴 */}
      <button
        type="button"
        aria-label="댓글 삭제"
        onClick={handleOpen}
        className={clsx("cursor-pointer", className)}
      >
        <TrashIcon size={20} ariaLabel="댓글 삭제" />
      </button>

      {/* 모달 */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="댓글 삭제 확인"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-[var(--Surface-Normal-Container50,#001F33)]/40"
            onClick={handleClose}
            aria-hidden
          />

          {/* 모달 박스 */}
          <div className="relative z-10 w-152 h-74 bg-white rounded-[20px] px-29 py-10">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-surface-container-10 p-3 mb-5">
                <ExclamationIcon size={60} />
              </div>

              <div className="typo-h3-semibold w-95 text-center mb-11">
                해당 댓글을 삭제하시겠어요?
              </div>

              {/* 버튼 그룹 */}
              <div className="w-full flex items-center justify-center gap-5">
                <div className="w-1/2 flex justify-center">
                  <BtnBasic
                    variant="gray"
                    onClick={handleClose}
                    className="w-full"
                  >
                    {cancelLabel}
                  </BtnBasic>
                </div>

                <div className="w-1/2 flex justify-center">
                  <BtnBasic
                    variant="blue"
                    onClick={handleConfirm}
                    className="w-full"
                  >
                    {confirmLabel}
                  </BtnBasic>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
