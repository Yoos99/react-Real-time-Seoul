import { useState, useMemo } from 'react';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';
import useFetchAreaData from '../hooks/useFetchAreaData'; // 커스텀 훅 가져오기
import useFetchFestivalData from '../hooks/useFetchFestivalData'; // 커스텀 훅 가져오기
import useFetchHotPlaceData from '../hooks/useFetchHotPlaceData'; // 커스텀 훅 가져오기
import {
  generateDescription,
  findHighestPopulationByAgeGroup,
} from '../utils/populationCalculate'; // 공통 파일 가져오기
import styles from './MainPage.module.scss';

function MainPage() {
  const [selectedName, setSelectedName] = useState(null);

  // 각 커스텀 훅에서 데이터 가져오기
  const { areaData, loading: areaLoading } = useFetchAreaData();
  const { festivalData } = useFetchFestivalData(selectedName);
  const { hotPlaceData, loading: hotPlaceLoading } =
    useFetchHotPlaceData(areaData);

  // Calculate highest population places by age group
  const highestPopulationByAgeGroup = useMemo(
    () => findHighestPopulationByAgeGroup(hotPlaceData),
    [hotPlaceData]
  );

  // Sort areaData to show highest population places by age group first
  const sortedAreaData = useMemo(() => {
    if (areaLoading || hotPlaceLoading || areaData.length === 0) {
      return [];
    }

    // Get the unique places from highestPopulationByAgeGroup
    const highestPlaces = Object.values(highestPopulationByAgeGroup)
      .map((item) => item.place_name)
      .filter((value, index, self) => value && self.indexOf(value) === index); // 중복 제거 및 null 제거

    // Create a list of remaining places excluding those in highestPlaces
    const remainingPlaces = areaData
      .filter((area) => !highestPlaces.includes(area.area_nm))
      .map((area) => area);

    // Concatenate highest places with the rest
    return [
      ...highestPlaces.map((name) =>
        areaData.find((area) => area.area_nm === name)
      ),
      ...remainingPlaces,
    ];
  }, [areaData, highestPopulationByAgeGroup, areaLoading, hotPlaceLoading]);

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.listContainer}>
          <h1>현재 가장 인기 있는 장소!</h1>
          {(areaLoading || hotPlaceLoading) && (
            <div>데이터를 불러오는 중입니다...</div>
          )}
          {sortedAreaData.length > 0 && (
            <>
              {Object.keys(highestPopulationByAgeGroup).map((ageGroup) => {
                const placeName =
                  highestPopulationByAgeGroup[ageGroup].place_name;
                const area = areaData.find(
                  (item) => item.area_nm === placeName
                );

                if (area) {
                  const hotPlace = hotPlaceData[area.area_nm];
                  const description = generateDescription(
                    hotPlace,
                    hotPlaceLoading
                  );

                  return (
                    <div key={ageGroup} className={styles.ageGroupSection}>
                      <h2 className={styles.ageGroupTitle}>
                        {ageGroup}가 가장 많이 방문했어요!
                      </h2>
                      <div
                        className={styles.card}
                        onClick={() => setSelectedName(area.area_nm)}
                      >
                        <div className={styles.cardImage}>
                          <img
                            src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${area.area_nm}.jpg`}
                            alt={area.area_nm}
                            className={styles.image}
                          />
                        </div>
                        <div className={styles.cardContent}>
                          <h2>{area.area_nm}</h2>
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
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
                    const description = generateDescription(
                      hotPlace,
                      hotPlaceLoading
                    );

                    return (
                      <div
                        key={index}
                        className={styles.card}
                        onClick={() => setSelectedName(area.area_nm)}
                      >
                        <div className={styles.cardImage}>
                          <img
                            src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${area.area_nm}.jpg`}
                            alt={area.area_nm}
                            className={styles.image}
                          />
                        </div>
                        <div className={styles.cardContent}>
                          <h2>{area.area_nm}</h2>
                          <p>{description}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
        <div className={styles.mapContainer}>
          <KakaoMap areaData={areaData} eventData={festivalData} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
