import React, { useEffect } from "react";
import {
  stampPositions,
  toiletPositions,
  parkPositions,
  cafePosition,
} from "../lib/positions.js";
const { kakao } = window;

export default function KakaoMap({ userLocation, markers }) {
  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.7986, 128.5228), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);
    let currentInfoWindow = null; // 현재 열려있는 인포윈도우를 추적하기 위한 변수
    let userCustomOverlay = null; // 사용자 위치 마커의 커스텀 오버레이를 저장하기 위한 변수

    // 마커 표시할 장소 목록
    let positions;
    switch (markers) {
      case "스탬프":
        positions = stampPositions;
        break;
      case "주차장":
        positions = parkPositions;
        break;
      case "카페/쉼터":
        positions = cafePosition;
        break;
      case "화장실":
        positions = toiletPositions;
        break;
      default:
        break;
    }

    positions.forEach((p, index) => {
      var imageSrc = "markers/gpsMarker.svg";
      var imageSize = new kakao.maps.Size(24, 41),
        imgOptions = {
          spriteSize: new kakao.maps.Size(24, 250), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, index * 41), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        img = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new kakao.maps.Marker({
        position: p.latlng,
        title: p.title,
        image: img,
      });

      const content = `      
      <div class="mapMarker">${p.title}</div>
    `;

      // 인포윈도우를 생성합니다
      var infoWindow = new kakao.maps.CustomOverlay({
        content: content,
        position: p.latlng,
        removable: false, // X 버튼으로 인포윈도우를 닫을 수 있도록 설정합니다
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 현재 열려있는 인포윈도우가 있을 경우 닫습니다.
        if (currentInfoWindow && currentInfoWindow !== userCustomOverlay) {
          currentInfoWindow.setMap(null);
        }
        // 현재 클릭한 마커의 인포윈도우를 엽니다.
        infoWindow.setMap(map);
        currentInfoWindow = infoWindow;
      });

      marker.setMap(map); // 마커를 지도에 추가합니다.
    });

    // 사용자의 위치가 있을 경우 마커로 표시
    if (userLocation) {
      // const userPosition = new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude);
      const userPosition = new kakao.maps.LatLng(35.799, 128.5221);

      // 사용자 위치를 나타낼 마커 생성

      var imageSrc = "markers/myMarker.svg",
        imageSize = new kakao.maps.Size(24, 41),
        imgOptions = { offset: new kakao.maps.Point(11, 41) },
        img = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

      const marker = new kakao.maps.Marker({
        position: userPosition,
        image: img,
      });

      // 마커를 지도에 표시

      marker.setMap(map);

      // 지도 중심을 사용자의 위치로 이동
      // map.setCenter(userPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, markers]);

  return (
    <div
      id="map"
      style={{
        width: "90%",
        height: "67vh",
      }}
    ></div>
  );
}
