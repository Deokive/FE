import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { FormFields } from "@/pages/Auth/SignupPage";
import EmailSelectBox from "./EmailSelectBox";

// 이메일 도메인 옵션
const emailDomainOptions = [
  { label: "naver.com", value: "naver.com" },
  { label: "daum.net", value: "daum.net" },
  { label: "gmail.com", value: "gmail.com" },
  { label: "nate.com", value: "nate.com" },
  { label: "hanmail.net", value: "hanmail.net" },
];

type SignupStep2Props = {
  register: UseFormRegister<FormFields>;
  control: Control<FormFields>;
  errors: FieldErrors<FormFields>;
};

const SignupStep2 = ({ register, control, errors }: SignupStep2Props) => {
  return (
    <div className="w-[711px] flex flex-col gap-[34px] items-start">
      {/* 이메일 */}
      <div className="flex flex-col gap-4">
        <p className="typo-h2 text-color-highest">이메일</p>
        <div className="flex items-center gap-2">
          {/* 이메일 아이디 */}
          <input
            {...register("emailId")}
            type="text"
            className={`w-82 h-[65px] p-5 border-2 rounded-xl typo-h2 border-solid border-border-mid
        placeholder:text-color-mid focus:outline-none placeholder:text-color-low
        ${errors.emailId ? "border-border-accent" : "border-border-mid"}`}
            placeholder="이메일 아이디"
          />

          {/* @ 기호 */}
          <span className="typo-h2 text-color-highest">@</span>

          {/* 이메일 도메인 선택 */}
          {/* 이메일 도메인 SelectBox */}
          <Controller
            name="emailDomain"
            control={control}
            render={({ field }) => (
              <EmailSelectBox
                options={emailDomainOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="직접 입력"
                className="w-82"
              />
            )}
          />
        </div>
        {(errors.emailId || errors.emailDomain) && (
          <p className="typo-h3 text-color-accent">
            {errors.emailId?.message || errors.emailDomain?.message}
          </p>
        )}
      </div>
      {/* 비밀번호 */}
      <div className="flex flex-col gap-2">
        <p className="typo-body2 text-color-high">비밀번호</p>
        <input
          {...register("password")}
          type="password"
          className={`w-full h-12 px-4 border rounded-lg typo-body1 text-color-highest
      placeholder:text-color-mid focus:outline-none focus:border-brand-blue-500
      ${errors.password ? "border-red-500 bg-red-50" : "border-border-mid"}`}
          placeholder="비밀번호 (8~16자)"
        />
        {errors.password && (
          <p className="typo-body2 text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          {...register("passwordCheck")}
          type="password"
          className={`w-full h-12 px-4 border rounded-lg typo-body1 text-color-highest
      placeholder:text-color-mid focus:outline-none focus:border-brand-blue-500
      ${
        errors.passwordCheck ? "border-red-500 bg-red-50" : "border-border-mid"
      }`}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {errors.passwordCheck && (
          <p className="typo-body2 text-red-500">
            {errors.passwordCheck.message}
          </p>
        )}
      </div>
      {/* 닉네임 */}
      <div className="flex flex-col gap-2">
        <p className="typo-body2 text-color-high">닉네임</p>
        <input
          {...register("nickname")}
          type="text"
          className={`w-full h-12 px-4 border rounded-lg typo-body1 text-color-highest
      placeholder:text-color-mid focus:outline-none focus:border-brand-blue-500
      ${errors.nickname ? "border-red-500 bg-red-50" : "border-border-mid"}`}
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && (
          <p className="typo-body2 text-red-500">{errors.nickname.message}</p>
        )}
      </div>
      {/* 등록 버튼 */}
    </div>
  );
};

export default SignupStep2;
