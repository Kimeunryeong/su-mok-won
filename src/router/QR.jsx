import QRCode from 'qrcode.react';

export default function TestQr() {
    // QR 코드를 스캔하여 서버로 전송하는 함수
  
    const data = {
        // 각 큐알에 대한 위도,경도
        latitude: 33.123123,
        longitude: 33.123123123
    };
    const data1 = {
        latitude: 33.123123,
        longitude: 33.123123123
    }

    return (
        <>
        <QRCode value={JSON.stringify(data)} size="512" />
        <QRCode value={JSON.stringify(data1)} size="512" />
        </>
    );
}