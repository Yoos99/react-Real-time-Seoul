import { useState, useEffect } from 'react';
import KakaoMap from '../components/KakaoMap';
import { fetchAreaData, fetchFestivalData } from '../api/api'; // 데이터 API 로직 가져오기
import Header from '../components/Header';
import styles from './MainPage.module.scss';

function MainPage() {
  const [areaData, setAreaData] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [eventData, setFesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchAreaData();
        setAreaData(data);
      } catch (error) {
        console.log(error);
        setError('지역 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getFestivalData = async () => {
      if (!selectedName) return;
      try {
        setLoading(true);
        const data = await fetchFestivalData(selectedName);
        setFesData(data);
      } catch (error) {
        console.log(error);
        setError('문화행사 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getFestivalData();
  }, [selectedName]);

  return (
    <>
      <Header /> {/* 최상단에 위치 */}
      <div className={styles.mainContainer}>
        <div className={styles.listContainer}>
          <h1>현재 가장 인기 있는 장소!</h1>
          {loading && <div>데이터를 불러오는 중입니다...</div>}
          {error && <div>{error}</div>}
          {areaData && areaData.length > 0 && (
            <div className={styles.cardList}>
              {areaData.map((area, index) => (
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
                    <p>장소 설명이 여기에 들어갑니다.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.mapContainer}>
          <KakaoMap areaData={areaData} eventData={eventData} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
