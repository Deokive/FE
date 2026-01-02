import React from "react";
import clsx from "clsx";
import TextField from "../common/Form/TextField";
import { BtnBasic } from "../common/Button/Btn";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  showCount?: boolean;
  id?: string;
  ariaLabel?: string;
  btnLabel?: string;
  className?: string;
};

export default function CommentInput({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  disabled = false,
  maxLength,
  id,
  ariaLabel,
  btnLabel = "등록",
}: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2.5">
        <div className="flex-1">
          <TextField
            id={id}
            ariaLabel={ariaLabel}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            showCount={true}
            multiline={false}
            error={null}
            className="[&_input]:bg-white [&_textarea]:bg-white"
          />
        </div>
        <div className="flex justify-end">
          <BtnBasic
            variant="gray"
            onClick={onSubmit}
            disabled={disabled || value.trim().length === 0}
            className={clsx(
              "w-27.5 h-11 rounded-lg self-center",
              value.trim().length === 0 || disabled
                ? "bg-brand-blue-200 typo-body2-semibold text-mid pointer-events-none"
                : "bg-brand-blue-300 text-white cursor-pointer hover:bg-brand-blue-400"
            )}
          >
            {btnLabel}
          </BtnBasic>
        </div>
      </div>
    </div>
  );
}
