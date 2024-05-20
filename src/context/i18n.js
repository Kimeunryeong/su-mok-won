import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        menu: {
          home: "Home",
          map: "Map",
          qr: "QR Scan",
          stamp: "Stamp",
          mypage: "My page",
        },
        main: {
          guide0: "asdf0",
          guide1: "asdf1",
          guide2: "asdf2",
          guide3: "next",
          guide4: "close",
          hello0: "asdf0",
          hello1: "asdf1",
          hello2: "asdf2",
          hello3: "asdf3",
          hello4: "asdf4",
          menu0: "menu0",
          menu1: "menu1",
          menu2: "m2",
          menu3: "m3",
          weather0: "w0",
          weather1: "w1",
        },
        introSumok: {
          iS0: "asdf0",
          iS1: "asdf1",
          iS2: "asdf2",
          iS3: "asdf3",
          iS4: "asdf4",
          iS5: "asdf5",
          iS6: "asdf6",
          iS7: "asdf7",
          iS8: "asdf8",
          iS9: "asdf9",
          iS10: "asdf10",
          iS11: "asdf11",
          iS12: "asdf12",
          iS13: "asdf13",
          iS14: "asdf14",
          iS15: "asdf15",
          iS16: "asdf16",
          iS17: "asdf17",
        },
        indoor1: {
          iI0: "산림문화eng",
          iI1: "iI1",
          iI2: "iI2",
          iI3: "iI3",
          iI4: "iI4",
          iI5: "iI5",
          iI6: "iI6",
          iI7: "iI7",
          iI8: "iI8",
          iI9: "iI9",
          iI10: "iI10",
          iI11: "iI11",
          iI12: "iI12",
        },
        indoor2: {
          iI0: "목재문화eng",
          iI1: "iI1",
          iI2: "iI2",
          iI3: "iI3",
          iI4: "iI4",
          iI5: "iI5",
          iI6: "iI6",
          iI7: "iI7",
          iI8: "iI8",
          iI9: "iI9",
          iI10: "iI10",
          iI11: "iI11",
          iI12: "iI12",
          iI13: "iI13",
          iI14: "iI14",
          iI15: "iI15",
          iI16: "iI16",
          iI17: "iI17",
          iI18: "iI18",
          iI19: "iI19",
          iI20: "iI20",
          iI21: "iI21",
        },
        mapPage: {
          m0: "QR code",
          m1: "Cafe",
          m2: "Toilet",
          m3: "m3",
          m4: "m4",
          m5: "m5",
          m6: "m6",
          m7: "m7",
          m8: "m8",
          m9: "m9",
          m10: "m10",
          m11: "m11",
          m12: "m12",
          m13: "m13",
          m14: "m14",
          m15: "m15",
          m16: "m16",
          m17: "m17",
          m18: "m18",
          m19: "m19",
          m20: "m20",
          m21: "m21",
          m22: "m22",
          m23: "m23",
          m24: "m24",
          m25: "m25",
          m26: "m26",
          m27: "m27",
          m28: "m28",
          m29: "m29",
          m30: "m30",
          m31: "m31",
          m32: "m32",
          m33: "m33",
        },
        stampPage: {
          sp0: "sp0",
          sp1: "sp1",
          sp2: "sp2",
          sp3: "sp3",
          sp4: "sp4",
          sp5: "sp5",
          sp6: "sp6",
        },
        myPage: {
          mp0: "'s My page",
          mp1: "mp1",
          mp2: "mp2",
          mp3: "mp3",
          mp4: "mp4",
          mp5: "mp5",
          mp6: "mp6",
          mp7: "언어 변경",
          mp8: "언어를 한국어로 변경합니다.<br />This changes the app's language to Korean.",
          mp9: "Log out",
        },
        etc: {
          h1: "Date",
          h2: "Time",
        },
      },
    },
    ko: {
      translation: {
        menu: {
          home: "홈",
          map: "지도",
          qr: "QR 촬영",
          stamp: "스탬프",
          mypage: "마이페이지",
        },
        main: {
          guide0: "회원 가입 후, 아래쪽의 QR 촬영 버튼을 누르면 카메라가 켜집니다.",
          guide1: "QR 코드는 대구 수목원 곳곳에 있습니다. 카메라 렌즈를 QR코드에 가까이 대주세요.",
          guide2: "QR 코드를 스캔하면 스탬프가 찍힙니다. 스탬프를 모으고 다양한 경품을 받아가세요!",
          guide3: "다음",
          guide4: "닫기",
          hello0: "앱 이용 방법",
          hello1: "스탬프 찍고 경품 받아가세요!",
          hello2: "님 안녕하세요!",
          hello3: "내가 모은 스탬프: ",
          hello4: "개",
          menu0: "대구수목원 소개",
          menu1: "이용시간, 주의사항 등",
          menu2: "산림문화전시관",
          menu3: "목재문화체험장",
          weather0: "지금 수목원은",
          weather1: "날씨 정보를 불러오는 중",
        },
        introSumok: {
          iS0: "수목원 소개",
          iS1: "이용 시간",
          iS2: "1월 1일 ~ 4월 30일",
          iS3: "오전 9시 ~ 오후 6시",
          iS4: "5월 1일 ~ 8월 31일",
          iS5: "오전 8시 ~ 오후 7시",
          iS6: "9월 1일 ~ 12월 31일",
          iS7: "오전 9시 ~ 오후 6시",
          iS8: "온실 이용시간: 오전 10시 ~ 오후 4시",
          iS9: "월요일: 온실, 산림문화전시관, 목재문화체험장 이용 불가",
          iS10: "입장료·주차요금은 무료이며 쓰레기는 반드시 되가져 가야합니다.",
          iS11: "금지사항",
          iS12: "주류, 버너, 텐트, 그늘막 취사 등",
          iS13: "자전거, 킥보드, 인라인 스케이트",
          iS14: "식물 및 토석 채집, 채취",
          iS15: "확성기, 마이크 등 방송기기",
          iS16: "안내견 이외 반려동물 출입",
          iS17: "기타 위협을 줄 수 있는 물품",
        },
        indoor1: {
          iI0: "산림문화전시관",
          iI1: "이곳 수목원과 대구의 식물상을 소개하는 공간입니다. 나무 이름의 유래, 꽃의 구조, 식물, 새, 곤충의 세밀화 등 다양한 정보를 접할 수 있습니다.",
          iI2: "이용 시간",
          iI3: "3월 1일 ~ 10월 31일",
          iI4: "오전 10시 ~ 오후 5시",
          iI5: "11월 1일 ~ 2월 28일",
          iI6: "오전 10시 ~ 오후 4시",
          iI7: "매주 월요일과 추석, 설날은 휴관일입니다.",
          iI8: "층별 안내",
          iI9: "1층",
          iI10: "비지터 센터, 제1전시실, 작은 도서관",
          iI11: "2층",
          iI12: "제2전시실, 기획전시실",
          iI13: "위치",
        },
        indoor2: {
          iI0: "목재문화체험장",
          iI1: "시민들에게 목공체험을 통한 다양한 목재문화 및 목공예에 관한 정보를 제공하는 공간입니다.",
          iI2: "이용 시간",
          iI3: "3월 1일 ~ 10월 31일",
          iI4: "오전 9시 ~ 오후 5시",
          iI5: "11월 1일 ~ 2월 28일",
          iI6: "오전 9시 ~ 오후 4시",
          iI7: "매주 월요일과 공휴일은 휴관일입니다.",
          iI8: "목공 체험 안내",
          iI9: "체험프로그램 참여 방법",
          iI10: "대구광역시 통합예약시스템",
          iI11: "에서 3일전까지 예약",
          iI12: "참여 비용",
          iI13: "성인: 2,000원",
          iI14: "미성년자: 1,000원",
          iI15: "현장 카드 결제만 가능하며, 재료비는 별도입니다.",
          iI16: "20명 이상 예약시 개인체험료의 20%가 할인됩니다.",
          iI17: "층별 안내",
          iI18: "1층",
          iI19: "유아체험장· 유아놀이방, 초등체험장",
          iI20: "2층",
          iI21: "중등체험장, 성인체험장",
        },
        mapPage: {
          m0: "QR 코드",
          m1: "카페/쉼터",
          m2: "화장실",
          m3: "침엽수원",
          m4: "잎이 바늘같이 뾰족한 침엽수들이 자라는 곳입니다.",
          m5: "습지원",
          m6: "물가에서 잘 자라거나 습기를 좋아하는 식물을 모아 전시한 곳입니다.",
          m7: "무궁화원",
          m8: "단군시대로부터 내려오는 우리나라의 꽃, 무궁화가 있는 곳입니다.",
          m9: "염료 식물원",
          m10: "천연염료로 사용 가능한 식물을 모아 놓은 곳입니다.",
          m11: "양치 식물원",
          m12: "꽃을 피우지 않고 포자로 번식하는 양치식물을 전시한 곳입니다.",
          m13: "전통정원",
          m14: "우리나라 전통정원을 재현한 곳으로 방지원도, 정자, 담장, 화계 등으로 구성되어 있습니다.",
          m15: "수목원 커피",
          m16: "숲을 바라보며 차 한잔을 즐기기 좋은 곳입니다.",
          m17: "쉼터",
          m18: "",
          m19: "주차장 화장실",
          m20: "산책로 화장실 1",
          m21: "산책로 화장실 2",
          m22: "산책로 화장실 3",
        },
        stampPage: {
          sp0: "스탬프 1개",
          sp1: "생분해 대나무 칫솔",
          sp2: "스탬프 3개",
          sp3: "친환경 설거지 비누",
          sp4: "스탬프 6개",
          sp5: "업사이클링 에코백",
        },
        myPage: {
          mp0: "님의 마이페이지",
          mp1: "비밀번호",
          mp2: "수정",
          mp3: "다크 모드",
          mp4: "앱 화면을 어둡게 변경합니다.",
          mp5: "색맹 모드",
          mp6: "색상을 구분하기 힘든 분들을 위해 일부 요소의 색상을 변경합니다.",
          mp7: "Change language",
          mp8: "언어를 영어로 변경합니다.<br />This changes the app's language to English.",
          mp9: "로그아웃",
        },
        etc: {
          h1: "기간",
          h2: "시간",
        },
      },
    },
  },
  lng: "ko", // 기본 언어 설정
  fallbackLng: "en", // 언어가 지원되지 않을 때의 대체 언어 설정
  interpolation: {
    escapeValue: false, // 리액트는 HTML 태그도 렌더링할 수 있어서 false로 설정합니다.
  },
});

export default i18n;
