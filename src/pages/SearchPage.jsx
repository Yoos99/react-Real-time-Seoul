import { useSelector } from 'react-redux';
import PlaceCard from '../components/PlaceCard';
import useFetchAreaData from '../hooks/useFetchAreaData'; // 지역 데이터를 가져오는 커스텀 훅
import useFetchHotPlaceData from '../hooks/useFetchHotPlaceData'; // 인구 데이터를 가져오는 커스텀 훅
import styles from './SearchPage.module.scss';
import KakaoMap from '../components/KakaoMap';
import Header from '../components/Header';

function SearchPage() {
  // Redux 상태에서 검색어 가져오기
  const searchQuery = useSelector((state) => state.search.searchTerm);
  const { areaData, loading: areaLoading } = useFetchAreaData();
  const { hotPlaceData, loading: hotPlaceLoading } =
    useFetchHotPlaceData(areaData);

  // 검색어에 따라 필터링된 장소 목록 생성
  const filteredPlaces = areaData.filter((area) =>
    area.area_nm.includes(searchQuery)
  );

  return (
    <>
      <Header />
      <div className={styles.searchPage}>
        <div className={styles.listContainer}>
          {searchQuery && (
            <h1 className={styles.searchTitle}>
              검색어: <span className={styles.searchQuery}>{searchQuery}</span>
            </h1>
          )}
          {areaLoading || hotPlaceLoading ? (
            <div>데이터를 불러오는 중입니다...</div>
          ) : filteredPlaces.length > 0 ? (
            <div className={styles.cardList}>
              {filteredPlaces.map((place, index) => {
                const hotPlace = hotPlaceData[place.area_nm];
                return <PlaceCard key={index} hotPlace={hotPlace} />;
              })}
            </div>
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
        <div className={styles.mapContainer}>
          <KakaoMap areaData={filteredPlaces} />
        </div>
      </div>
    </>
  );
}

export default SearchPage;
