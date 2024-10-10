import { useState, useEffect } from 'react';
import { fetchAreaData } from '../../api/api';

const useFetchAreaData = () => {
  const [areaData, setAreaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAreaData();
        setAreaData(data);
      } catch (error) {
        console.log('지역 데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError('지역 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { areaData, loading, error };
};

export default useFetchAreaData;
