import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AreaCard from './AreaCard';

function KakaoMap({ areaData }) {
  const [selectedArea, setSelectedArea] = useState(null); // 선택된 지역 정보 저장

  return (
    <div style={{ position: 'relative' }}>
      <Map
        center={{ lat: 37.55659428234287, lng: 126.97302795181167 }}
        style={{ width: '1500px', height: '1000px' }}
        level={7}
        onClick={() => setSelectedArea(null)} // 맵을 클릭하면 카드 닫기
      >
        {/* 모든 지역 데이터를 이용해 마커를 생성 */}
        {areaData &&
          areaData.length > 0 &&
          areaData.map((area, index) => (
            <MapMarker
              key={index}
              position={{ lat: parseFloat(area.x), lng: parseFloat(area.y) }}
              clickable={true}
              onClick={() => setSelectedArea(area)} // 마커 클릭 시 지역 정보 설정
            />
          ))}
      </Map>

      {/* 선택된 지역의 상세 정보를 출력 (카드) */}
      {selectedArea && (
        <AreaCard
          area={selectedArea}
          onClose={() => setSelectedArea(null)} // 카드 닫기 버튼 설정
        />
      )}
    </div>
  );
}

export default KakaoMap;
