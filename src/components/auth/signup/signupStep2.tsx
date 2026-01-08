import type { FormFields } from "@/pages/Auth/SignupPage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type SignupStep2Props = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
};

const SignupStep2 = ({ register, errors }: SignupStep2Props) => {
  return (
    <div className="w-[711px] flex flex-col gap-4 items-start">
      {/* 이메일 */}
      <div className="flex flex-col gap-2">
        <p className="typo-body2 text-color-high">이메일</p>
        <input
          {...register("email")}
          type="email"
          className={`w-full h-12 px-4 border rounded-lg typo-body1 text-color-highest
      placeholder:text-color-mid focus:outline-none focus:border-brand-blue-500
      ${errors.email ? "border-red-500 bg-red-50" : "border-border-mid"}`}
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && (
          <p className="typo-body2 text-red-500">{errors.email.message}</p>
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
