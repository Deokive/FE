const LoginPage = () => {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col gap-3 w-[300px]">
        <input
          type={"email"}
          className={`border bprder-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm`}
          placeholder="이메일"
        />
        <input
          type={"password"}
          className={`border bprder-[#ccc] w-[300px] h-[40px] p-2 focus:border-[#807bff] rounded-sm`}
          placeholder="비밀번호"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={false}
          className={`w-full bg-[#807bff] text-white hover:bg-[#6666ff] h-[40px] rounded-sm cursor-pointer`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
