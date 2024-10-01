import { Map } from 'react-kakao-maps-sdk';

function KakaoMap() {
  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      style={{ width: '1500PX', height: '1000px' }}
      level={3}
    />
  );
}

export default KakaoMap;
