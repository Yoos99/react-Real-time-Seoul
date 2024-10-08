import { useState, useEffect } from 'react';

const useFetchHotPlaceData = (areaData) => {
  const [hotPlaceData, setHotPlaceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchHotPlace = async (name) => {
    if (!name) return;

    const apiUrl = `/api/fetchHotPlace?name=${name}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '데이터를 가져오는 데 실패했습니다.');
      }

      return data; // 서버리스 함수에서 받은 인구 밀도 데이터 반환
    } catch (error) {
      console.error(
        '인구 밀도 데이터를 가져오는 중 오류가 발생했습니다:',
        error
      );
      throw new Error('인구 밀도 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (areaData.length === 0) return;

    const getHotPlaceData = async () => {
      try {
        const hotPlaceDataPromises = areaData.map((area) =>
          fetchHotPlace(area.area_nm).then((response) => ({
            [area.area_nm]: response,
          }))
        );
        const hotPlaceDataResults = await Promise.all(hotPlaceDataPromises);
        const hotPlaceDataMap = Object.assign({}, ...hotPlaceDataResults);
        setHotPlaceData(hotPlaceDataMap);
      } catch (error) {
        console.log('인구 데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError('인구 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getHotPlaceData();
  }, [areaData]);

  return { hotPlaceData, loading, error };
};

export default useFetchHotPlaceData;
