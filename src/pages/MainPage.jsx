import { useState } from 'react';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';
import PlaceCard from '../components/PlaceCard'; // 새로운 PlaceCard 컴포넌트 가져오기
import useFetchAreaData from '../hooks/useFetchAreaData'; // 지역 데이터를 가져오는 커스텀 훅
import useFetchFestivalData from '../hooks/useFetchFestivalData'; // 축제 데이터를 가져오는 커스텀 훅
import useFetchHotPlaceData from '../hooks/useFetchHotPlaceData'; // 인구 데이터를 가져오는 커스텀 훅
import useCalculateHighestPopulation from '../hooks/useCalculateHighestPopulation'; // 나이대별 계산 로직 커스텀 훅
import { getAgeGroupClassName } from '../utils/classNameMapper'; // 나이대별 클래스 이름을 가져오는 함수
import styles from './MainPage.module.scss'; // 스타일 가져오기

function MainPage() {
  const [selectedName, setSelectedName] = useState(null); // 사용자가 선택한 지역 이름 저장

  // 커스텀 훅을 사용하여 각 데이터 가져오기
  const { areaData, loading: areaLoading } = useFetchAreaData();
  const { festivalData } = useFetchFestivalData(selectedName);
  const { hotPlaceData, loading: hotPlaceLoading } =
    useFetchHotPlaceData(areaData);

  // 나이대별 계산 커스텀 훅 사용
  const { highestPopulationByAgeGroup, sortedAreaData } =
    useCalculateHighestPopulation(
      hotPlaceData,
      areaData,
      areaLoading || hotPlaceLoading
    );

  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <div className={styles.mainContainer}>
        <div className={styles.listContainer}>
          <h1>현재 가장 인기 있는 장소!</h1>
          {(areaLoading || hotPlaceLoading) && (
            <div>데이터를 불러오는 중입니다...</div>
          )}
          {sortedAreaData.length > 0 && (
            <>
              {/* 나이대별로 가장 인기 있는 장소 표시 */}
              {Object.keys(highestPopulationByAgeGroup).map((ageGroup) => {
                const placeName =
                  highestPopulationByAgeGroup[ageGroup].place_name;
                const area = areaData.find(
                  (item) => item.area_nm === placeName
                );

                if (area) {
                  const hotPlace = hotPlaceData[area.area_nm];

                  // 나이대별 클래스 설정
                  const ageGroupClass = `${styles.ageGroupTitle} ${styles[getAgeGroupClassName(ageGroup)]}`;

                  return (
                    <div key={ageGroup} className={styles.ageGroupSection}>
                      {/* 나이대별 제목을 설정하고 스타일에 맞게 적용 */}
                      <h2 className={ageGroupClass}>
                        <span className={styles.ageHighlight}>{ageGroup}</span>
                        가 가장 많이 방문했어요!
                      </h2>
                      {/* 나이대별 가장 인기 있는 장소 카드 */}
                      <PlaceCard
                        hotPlace={hotPlace}
                        onClick={() => setSelectedName(area.area_nm)}
                      />
                    </div>
                  );
                }
                return null;
              })}
              {/* 나이대별 인기 장소 외의 다른 장소들 목록 표시 */}
              <h2 className={styles.otherPlacesTitle}>다른 서울 핫플들</h2>
              <div className={styles.cardList}>
                {sortedAreaData
                  .filter(
                    (area) =>
                      !Object.values(highestPopulationByAgeGroup)
                        .map((item) => item.place_name)
                        .includes(area.area_nm)
                  )
                  .map((area, index) => {
                    const hotPlace = hotPlaceData[area.area_nm];

                    return (
                      <PlaceCard
                        key={index}
                        hotPlace={hotPlace}
                        onClick={() => setSelectedName(area.area_nm)}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </div>
        {/* 지도 컴포넌트 */}
        <div className={styles.mapContainer}>
          <KakaoMap areaData={areaData} eventData={festivalData} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
