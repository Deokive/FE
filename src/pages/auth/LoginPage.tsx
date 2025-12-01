import { validateSignIn, type UserSignInInformation } from "@/utils/validate";
import useForm from "@/hooks/useForm";

const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSignInInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignIn,
    });

  //엔터 눌러도 버튼 클릭되게 하기
  const handleSubmit = () => {
    console.log(values);
    //이런식으로 api 요청하면 로그인 처리 완료됨.
    // await axios.post("/api/auth/login", values);
    // window.location.href = "/";
  };

  //오류가 있거나 비어있으면 버튼 비활성화
  const isDisabled: boolean =
    Object.values(errors).some((error) => error !== "") ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col gap-3 w-[300px]">
        <input
          {...getInputProps("email")}
          name="email"
          type={"email"}
          className={`border bprder-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm`}
          placeholder="이메일"
        />
        {errors.email && touched?.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          type={"password"}
          className={`border bprder-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm`}
          placeholder="비밀번호"
        />
        {errors.password && touched?.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full bg-[#807bff] text-white hover:bg-[#6666ff] h-[40px] rounded-sm cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
