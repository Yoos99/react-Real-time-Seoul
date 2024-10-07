import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import AreaCard from './AreaCard';
import styles from './KakaoMap.module.scss';

function KakaoMap({ areaData }) {
  const [selectedArea, setSelectedArea] = useState(null); // 선택된 지역 정보 저장

  return (
    <div className={styles.mapContainer}>
      <Map
        center={{ lat: 37.55659428234287, lng: 126.97302795181167 }}
        className={styles.kakaoMap}
        level={6}
        onClick={() => setSelectedArea(null)} // 맵을 클릭하면 카드 닫기
      >
        {/* 모든 지역 데이터를 이용해 마커를 생성 */}
        {areaData &&
          areaData.length > 0 &&
          areaData.map((area, index) => (
            <MapMarker
              key={index}
              position={{ lat: parseFloat(area.x), lng: parseFloat(area.y) }}
              image={{
                src: 'src/img/placeMappin.svg',
                size: { width: 50, height: 50 },
              }}
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
