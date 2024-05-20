import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IsLogin = ({ updateUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리합니다.

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (!userData) {
      Swal.fire({
        text: "로그인이 필요합니다.",
        padding: "20px 0",
        width: "350px",
        confirmButtonText: "확인",
        buttonsStyling: false,
      });
      navigate("/login"); // 로그인 페이지 경로로 이동합니다.
      return;
    }
    updateUser(userData); // 부모 컴포넌트로 사용자 정보를 전달합니다.
    setIsLoading(false); // 로딩 상태를 false로 업데이트합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // useEffect 의존성 배열에 navigate와 updateUser 추가

  // 로딩 중인 경우에는 로딩 메시지를 표시합니다.
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 사용자 데이터가 있으면 null을 반환합니다.
  return null;
};

export default IsLogin;
