import React, { useEffect, useMemo, useRef, useState } from "react";
import { BtnBasic } from "../common/Button/Btn";

const DEFAULT_URL_REGEX =
  /^(https?:\/\/)(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|localhost)(:\d+)?(\/[^\s]*)?$/i;

type LinkAttachPayload = { url: string };

type Props = {
  initial?: string;
  onAttach: (payload: LinkAttachPayload) => void;
  onCancel?: () => void;
  validate?: (url: string) => boolean;
  attachLabel?: string;
  cancelLabel?: string;
  autoFocus?: boolean;
  showPreview?: boolean; // 부모가 미리보기 처리하면 false
  className?: string;
};

export default function LinkAttachBox({
  initial = "",
  onAttach,
  onCancel,
  validate,
  attachLabel = "첨부",
  autoFocus = false,
  className = "",
}: Props) {
  const [url, setUrl] = useState(initial);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isValid = useMemo(() => {
    const v = url.trim();
    if (!v) return false;
    if (v.startsWith("http://") || v.startsWith("https://")) return true;
    const fn = validate ?? ((s: string) => DEFAULT_URL_REGEX.test(s.trim()));
    return fn(v);
  }, [url, validate]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleAttach = () => {
    if (!isValid) {
      return;
    }
    onAttach({ url: url.trim() });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAttach();
    } else if (e.key === "Escape") {
      onCancel?.();
    }
  };

  const showError = url.trim().length > 0 && !isValid;

  return (
    <div
      className={`w-145 h-67 px-9.5 py-11 bg-white shadow-lg flex flex-col${className}`}
    >
      <div className="typo-h3-semibold mb-8">링크 첨부하기</div>
      <div className="relative">
        <input
          ref={inputRef}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          aria-label="링크 URL 입력"
          placeholder="URL을 입력해주세요."
          className={`w-full p-2.5 rounded typo-h3 text-color-highest placeholder:text-low focus:outline-none ${
            showError
              ? "border border-[#FF0000]"
              : "border-2 border-border-mid focus:border-border-high"
          }`}
        />
        <div className="h-[17px] mt-2">
          {showError ? (
            <p className="text-[#FF0000] typo-caption" role="alert">
              유효한 링크를 입력해주세요.
            </p>
          ) : (
            // 공간 유지용 빈 노드
            <span className="inline-block" />
          )}
        </div>
      </div>
      <div className="flex justify-end mt-[7px]">
        <BtnBasic
          variant={isValid ? "blue" : "gray"}
          onClick={handleAttach}
          disabled={!isValid}
        >
          {attachLabel}
        </BtnBasic>
      </div>
    </div>
  );
}
