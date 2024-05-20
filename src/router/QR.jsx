import QRCode from "qrcode.react";

export default function TestQr() {
  // QR 코드를 스캔하여 서버로 전송하는 함수

  const data = {
    // 각 큐알에 대한 위도,경도
    no: 13,
    name: "침엽수원",
    latitude: 35.8013,
    longitude: 128.52097,
  };
  const data1 = {
    no: 14,
    name: "습지원",
    latitude: 35.80052370351272,
    longitude: 128.5201012191372,
  };
  const data2 = {
    no: 15,
    name: "무궁화원",
    latitude: 35.799712542069514,
    longitude: 128.52292532334738,
  };
  const data3 = {
    no: 16,
    name: "염료 식물원",
    latitude: 35.797142822107794,
    longitude: 128.5259099978123,
  };
  const data4 = {
    no: 17,
    name: "양치 식물원",
    latitude: 35.795706624856,
    longitude: 128.52537693278592,
  };
  const data5 = {
    no: 18,
    name: "전통정원",
    latitude: 35.79479437605564,
    longitude: 128.52571073583277,
  };

  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center">
        <QRCode value={JSON.stringify(data)} size="512" />
        <QRCode value={JSON.stringify(data1)} size="512" />
        <QRCode value={JSON.stringify(data2)} size="512" />
        <QRCode value={JSON.stringify(data3)} size="512" />
        <QRCode value={JSON.stringify(data4)} size="512" />
        <QRCode value={JSON.stringify(data5)} size="512" />
      </div>
    </>
  );
}
