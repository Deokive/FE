import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(2, { message: "이름을 입력해주세요." }),
    email: z.email({ message: "이메일 형식이 올바르지 않습니다." }), //zod V4부터 z.email() 사용
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
  })
  //완전히 바깥쪽에 refine 정의.
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur", //touched 되었는지 여부 확인
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const { passwordCheck, ...rest } = data;
    console.log(rest);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="flex flex-col items-center justify-center h-screen gap-4"
    >
      <div className="flex flex-col gap-3 w-[300px]">
        <input
          {...register("name")}
          name="name"
          type={"text"}
          className={`border border-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm
            ${errors.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          placeholder="이름"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
        <input
          {...register("email")}
          name="email"
          type={"email"}
          className={`border border-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm
            ${errors.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          placeholder="이메일"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
        <input
          {...register("password")}
          name="password"
          type={"password"}
          className={`border border-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm
            ${
              errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
        <input
          {...register("passwordCheck")}
          name="passwordCheck"
          type={"password"}
          className={`border border-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm
            ${
              errors.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}
        <button
          type="submit"
          // onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`w-full bg-[#807bff] text-white hover:bg-[#6666ff] h-[40px] rounded-sm cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupPage;
