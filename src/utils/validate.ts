export type UserSignInInformation = {
  email: string;
  password: string;
};

function validateSignInUser(values: UserSignInInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }
  // 비밀번호 8자 16자 사이
  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8자 이상 16자 이하이어야 합니다.";
  }

  return errors;
}

//로그인 유효성 검사
function validateSignIn(values: UserSignInInformation) {
  return validateSignInUser(values);
}

export { validateSignIn };
