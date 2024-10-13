import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import AreaCard from './AreaCard';
import FestivalCard from './FestivalCard';
import useFetchFestivalData from '../hooks/useFetchFestivalData';
import styles from './KakaoMap.module.scss';

function KakaoMap({ areaData }) {
  const [selectedArea, setSelectedArea] = useState(null); // 선택된 지역 정보 저장
  const [selectedFestival, setSelectedFestival] = useState(null); // 선택된 축제 정보 저장
  const { festivalData } = useFetchFestivalData(selectedArea?.area_nm); // 축제 데이터를 가져오는 커스텀 훅

  const handleMapClick = () => {
    setSelectedArea(null); // 맵을 클릭하면 선택된 지역 정보를 초기화
    setSelectedFestival(null); // 축제 정보도 초기화
  };

  const handleMarkerClick = (area) => {
    setSelectedArea(null); // 마커를 클릭할 때 이전 정보를 먼저 초기화
    setSelectedFestival(null); // 축제 정보도 초기화
    setSelectedArea(area); // 새로운 지역 정보 설정
  };

  const handleFestivalMarkerClick = (festival) => {
    setSelectedFestival(festival); // 축제 마커 클릭 시 해당 축제 정보 설정
  };

  return (
    <div className={styles.mapContainer}>
      <Map
        center={{ lat: 37.55659428234287, lng: 126.97302795181167 }}
        className={styles.kakaoMap}
        level={6}
        onClick={handleMapClick} // 맵을 클릭하면 모든 정보 초기화
      >
        {/* 모든 지역 데이터를 이용해 마커를 생성 */}
        {areaData &&
          areaData.length > 0 &&
          areaData.map((area, index) => (
            <MapMarker
              key={index}
              position={{ lat: parseFloat(area.x), lng: parseFloat(area.y) }}
              image={{
                src: '/img/placeMappin.svg',
                size: { width: 50, height: 50 },
              }}
              clickable={true}
              onClick={() => handleMarkerClick(area)} // 마커 클릭 시 지역 정보 설정
            />
          ))}

        {/* 선택된 지역에 축제 정보가 있으면 eventMappin 마커를 추가 */}
        {selectedArea &&
          festivalData &&
          festivalData.length > 0 &&
          festivalData.map((festival, index) => (
            <MapMarker
              key={index}
              position={{
                lat: parseFloat(festival.EVENT_Y),
                lng: parseFloat(festival.EVENT_X),
              }} // 축제 위치
              image={{
                src: '/img/eventMappin.svg', // 축제 마커 이미지
                size: { width: 50, height: 50 },
              }}
              clickable={true}
              title={festival.EVENT_NM} // 마커에 축제 이름 표시
              onClick={() => handleFestivalMarkerClick(festival)} // 축제 마커 클릭 시
            />
          ))}

        {/* 선택된 지역의 상세 정보를 CustomOverlayMap으로 출력 (팝업을 위쪽으로 이동) */}
        {selectedArea && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(selectedArea.x),
              lng: parseFloat(selectedArea.y),
            }}
          >
            <div className={styles.overlayPopup}>
              <AreaCard
                area={selectedArea}
                onClose={() => setSelectedArea(null)} // 카드 닫기 버튼 설정
              />
            </div>
          </CustomOverlayMap>
        )}

        {/* 선택된 축제의 상세 정보를 CustomOverlayMap으로 출력 (팝업을 위쪽으로 이동) */}
        {selectedFestival && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(selectedFestival.EVENT_Y),
              lng: parseFloat(selectedFestival.EVENT_X),
            }}
          >
            <div className={styles.overlayPopup}>
              <FestivalCard
                festival={selectedFestival}
                onClose={() => setSelectedFestival(null)} // 카드 닫기 버튼 설정
              />
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
}

export default KakaoMap;
