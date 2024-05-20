import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import "../style/qrpage.css";
import axios from "axios"; // axios 추가
import IsLogin from "../components/IsLogin";
import Swal from "sweetalert2";

export default function QrPage() {
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [videoStream, setVideoStream] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("내 위치 가져오기 실패:", error);
          return { error };
        }
      );
    } else {
      console.error("브라우저가 Geolocation API를 지원하지 않습니다.");
      return { error: "브라우저가 Geolocation API를 지원하지 않습니다." };
    }
  };
  getCurrentLocation();
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // 셀카 모드로 설정
          },
        });
        // 카메라 액세스 허용됨
        setPermissionGranted(true);
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        // 권한 거부 또는 오류 발생
        console.error("카메라 액세스 거부:", error);
        setPermissionGranted(false);
      }
    };

    // 페이지 진입 시 권한 확인
    if (permissionGranted === null) {
      requestCameraPermission();
    }

    // 페이지 벗어날 때 스트림 해제
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [permissionGranted, videoStream, user]);

  useEffect(() => {
    if (qrData) {
      // qrData가 변경될 때마다 서버에 데이터 전송
      sendDataToServer(qrData, user);
    }
  }, [qrData, user]);
  const updateUser = (userData) => {
    setUser(userData);
  };
  const sendDataToServer = async (data, user) => {
    try {
      const response = await axios.post("http://localhost:8000/users/testQr", {
        data,
        user,
        userLocation,
      });
      console.log("데이터 전송 완료:", response.data);
      const { result, message } = response.data;
      if (result === true) {
        Swal.fire({
          text: message,
          padding: "20px 0",
          width: "350px",
          confirmButtonText: "확인",
          buttonsStyling: false,
        });
        navigate("/stamp");
      }
      else {
        Swal.fire({
          text: message,
          padding: "20px 0",
          width: "350px",
          confirmButtonText: "확인",
          buttonsStyling: false,
        });
        navigate("/stamp");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (permissionGranted === true && videoStream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");

      const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          canvas.width = videoWidth;
          canvas.height = videoHeight;
          canvasContext.clearRect(0, 0, canvas.width, canvas.height); // 이전 프레임 지우기
          canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
          const imageData = canvasContext.getImageData(
            0,
            0,
            videoWidth,
            videoHeight
          );
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setQrData(code.data);
          }
        }
        requestAnimationFrame(scan);
      };

      requestAnimationFrame(scan);
    }
  }, [permissionGranted, videoStream]);

  return (
    <>
      <IsLogin updateUser={updateUser} />
      <div className="qrSection">
        <Link to="/home" className="qrArrow">
          <IoIosArrowBack color="white" />
        </Link>
        <p className="qrText">QR 코드를 촬영해주세요</p>
        {permissionGranted === false && (
          <p className="qrText">카메라 액세스 권한이 거부되었습니다.</p>
        )}
        <div
          className="qrZone"
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            overflow: "hidden",
          }}
        >
          {permissionGranted !== false && (
            <video
              id="videoElement"
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></video>
          )}
          {permissionGranted !== false && (
            <canvas
              id="canvasElement"
              ref={canvasRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            ></canvas>
          )}
        </div>
      </div>
    </>
  );
}
