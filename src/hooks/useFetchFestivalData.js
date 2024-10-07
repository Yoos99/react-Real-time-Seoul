import { useState, useEffect } from 'react';
import { fetchFestivalData } from '../api/api';

const useFetchFestivalData = (selectedName) => {
  const [festivalData, setFestivalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedName) return;

    const getFestivalData = async () => {
      setLoading(true);
      try {
        const data = await fetchFestivalData(selectedName);
        setFestivalData(data);
      } catch (err) {
        console.log('문화행사 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('문화행사 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getFestivalData();
  }, [selectedName]);

  return { festivalData, loading, error };
};

export default useFetchFestivalData;
