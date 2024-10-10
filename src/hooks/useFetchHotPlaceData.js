import { useState, useEffect } from 'react';
import { fetchHotPlace } from '../utils/fetchApi';

const useFetchHotPlaceData = (areaData) => {
  const [hotPlaceData, setHotPlaceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
