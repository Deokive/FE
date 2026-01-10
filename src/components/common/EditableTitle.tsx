import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value: string;
  onSave?: (next: string) => void; // 부모가 전달. API 연동 시 여기만 바꿔서 사용
  placeholder?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
};

export default function EditableTitle({
  value,
  onSave,
  placeholder = "티켓북명 (클릭하여 수정)",
  maxLength = 60,
  className,
  autoFocus = false,
}: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(value ?? "");
  const [draft, setDraft] = useState<string>(value ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 부모 value가 바뀌면 내부 동기화
  useEffect(() => {
    setText(value ?? "");
    setDraft(value ?? "");
  }, [value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(text);
    setEditing(false);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    const next = trimmed === "" ? text : trimmed; // 빈값이면 변경 안함
    setText(next);
    setEditing(false);
    if (next !== text) {
      onSave?.(next);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <div className={twMerge("inline-block", className)}>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) setDraft(e.target.value);
          }}
          onBlur={() => {
            // 포커스 아웃 시 저장
            commitEdit();
          }}
          onKeyDown={onKeyDown}
          aria-label="편집"
          placeholder={placeholder}
          className={"border-0 focus:outline-none typo-h1 text-color-highest"}
        />
      ) : (
        <button
          type="button"
          onClick={() => startEdit()}
          className="typo-h1 text-color-highest"
          aria-label="수정"
        >
          {text && text.length > 0 ? (
            text
          ) : (
            <span className="text-color-mid opacity-70">{placeholder}</span>
          )}
        </button>
      )}
    </div>
  );
}
