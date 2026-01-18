import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { BtnBasic } from "@/components/common/Button/Btn";
import ExclamationIcon from "../../assets/icon/ExclamationIcon";

// Props 정의
type ConfirmModalProps = {
  trigger?: React.ReactNode;
  title?: React.ReactNode; // 큰 제목
  description?: React.ReactNode; // 부설명
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  onConfirm: () => void;
  onCancel?: () => void;

  className?: string;
  confirmVariant?: "blue" | "gray";
  cancelVariant?: "gray";
  closeOnOverlayClick?: boolean;
  ariaLabel?: string;
};

export default function ConfirmModal({
  trigger,
  title = "정말 진행하시겠어요?",
  description,
  icon,
  confirmLabel = "확인",
  cancelLabel = "취소",
  open: controlledOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  className = "",
  confirmVariant = "blue",
  cancelVariant = "gray",
  closeOnOverlayClick = true,
  ariaLabel = "확인 모달",
}: ConfirmModalProps) {
  const isControlled = controlledOpen !== undefined;
  const [open, setOpen] = useState<boolean>(controlledOpen ?? false);
  const lastActiveElement = useRef<Element | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isControlled) setOpen(Boolean(controlledOpen));
  }, [controlledOpen, isControlled]);

  const setOpenInternal = (v: boolean) => {
    if (isControlled) onOpenChange?.(v);
    else setOpen(v);
  };

  const handleOpen = (e?: React.MouseEvent) => {
    lastActiveElement.current = document.activeElement;
    setOpenInternal(true);
    console.log("모달 열기", e?.currentTarget);
  };

  const handleClose = () => {
    setOpenInternal(false);
    onCancel?.();
    // 포커스 원복
    setTimeout(() => {
      const el = lastActiveElement.current as HTMLElement | null;
      el?.focus?.();
    }, 0);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // 오픈 시 확인 버튼에 포커스
  useEffect(() => {
    if (open) {
      setTimeout(() => confirmBtnRef.current?.focus(), 0);
      // 몸통 스크롤 잠금
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // 기본 아이콘(항상 노출)
  const topIcon = icon ?? <ExclamationIcon size={60} />;

  return (
    <>
      {/* 트리거: 전달된 노드를 클릭하면 모달 열림. 없으면 기본 버튼 노출 */}
      <div
        onClick={handleOpen}
        className={clsx("inline-block", !trigger && "cursor-pointer")}
      >
        {trigger ?? (
          <button type="button" className="cursor-pointer">
            열기
          </button>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-[var(--Surface-Normal-Container50,#001F33)]/40"
            onClick={() => closeOnOverlayClick && handleClose()}
            aria-hidden
          />

          {/* 모달 박스 */}
          <div
            className={clsx(
              "relative z-10 w-152 h-74 bg-white rounded-[20px] px-27.5 py-10",
              className
            )}
          >
            <div className="flex flex-col items-center">
              <div className="rounded-full p-3 mb-5">{topIcon}</div>

              <div className="typo-h3-semibold w-95 text-center mb-2">
                {title}
              </div>

              {description ? (
                <div className="typo-caption text-color-high mb-6.5">
                  {description}
                </div>
              ) : (
                <span className="inline-block mb-6.5" />
              )}

              <div className="w-full flex items-center justify-center gap-5">
                <div className="w-1/2 flex justify-center">
                  <BtnBasic
                    variant={cancelVariant}
                    onClick={handleClose}
                    className="w-full"
                  >
                    {cancelLabel}
                  </BtnBasic>
                </div>

                <div className="w-1/2 flex justify-center">
                  <BtnBasic
                    variant={confirmVariant === "blue" ? "blue" : "gray"}
                    onClick={handleConfirm}
                    className="w-full"
                  >
                    <span
                      ref={(el) => {
                        if (el) {
                        }
                      }}
                    >
                      {confirmLabel}
                    </span>
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
