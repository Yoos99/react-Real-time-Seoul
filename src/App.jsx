import { useState, useEffect } from 'react';
import ky from 'ky';
import KakaoMap from './components/KakaoMap';

const apiKey = import.meta.env.VITE_LIVESEOUL_KEY;

const App = () => {
  const [areaData, setAreaData] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [fesData, setFesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 서울시 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchAreaData = async () => {
      const dataUrl =
        'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';
      try {
        setLoading(true);
        const response = await ky.get(dataUrl).json();
        //console.log(response.row);
        setAreaData(response.row); // 데이터의 row 부분을 areaData로 설정
        console.log(response.row.map((item) => item.area_nm)[0]);
      } catch (error) {
        console.error('지역 데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError('지역 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAreaData();
  }, []);

  // 선택된 장소의 문화행사 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchFestivalData = async (name) => {
      if (!name) return;

      const fesURL = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${name}`;
      try {
        setLoading(true);
        const response = await ky.get(fesURL).json();
        const eventStatus = response.CITYDATA.EVENT_STTS;
        console.log(eventStatus);
        setFesData(eventStatus);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedName) {
      fetchFestivalData(selectedName);
    }
  }, [selectedName]);

  return (
    <div>
      <KakaoMap />
      <h1>서울시 행사 정보 조회</h1>

      {/* 지역 데이터를 불러오는 동안 로딩 메시지 표시 */}
      {loading && <div>데이터를 불러오는 중입니다...</div>}
      {error && <div>{error}</div>}

      {/* 지역 선택 */}
      {areaData && areaData.length > 0 && (
        <div>
          <h2>장소 선택</h2>
          <ul>
            {areaData.map((area, index) => (
              <li key={index}>
                <button onClick={() => setSelectedName(area.area_nm)}>
                  {area.area_nm}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 행사 데이터 출력 */}
      {fesData && (
        <div>
          <h2>{selectedName}의 행사 정보</h2>
          {fesData.length > 0 ? (
            <ul>
              {fesData.map((event, index) => (
                <li key={index}>
                  <p>행사 이름: {event.EVENT_NM}</p>
                  <p>
                    행사 위치: (위도: {event.EVENT_X}, 경도: {event.EVENT_Y})
                  </p>
                  <p>행사 상태: {event.EVENT_STATE}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>해당 장소에는 행사가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
