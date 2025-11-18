import googleLogo from "../../assets/google.png";
import kakaoLogo from "../../assets/kakao.png";
import naverLogo from "../../assets/naver.png";

export default function SocialLoginButtons() {
  // axios/hooks와 동일한 키로 통일
  const api = import.meta.env.VITE_API_BASE as string;
  return (
    <div className="mt-6">
      <hr className="mb-6" />
      <div className="flex justify-center items-center gap-10">
        <a href={`${api}/oauth2/authorization/kakao`}>
          <img
            src={kakaoLogo}
            alt="Kakao Login"
            className="w-12 h-12 cursor-pointer"
          />
        </a>
        <a href={`${api}/oauth2/authorization/google`}>
          <img
            src={googleLogo}
            alt="Google Login"
            className="w-12 h-12 cursor-pointer"
          />
        </a>
        <a href={`${api}/oauth2/authorization/naver`}>
          <img
            src={naverLogo}
            alt="Naver Login"
            className="w-12 h-12 cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}
