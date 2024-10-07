// src/hooks/useCalculateHighestPopulation.js

import { useMemo } from 'react';
import { findHighestPopulationByAgeGroup } from '../utils/populationCalculate';

// 나이대별로 인구 비율이 가장 높은 장소를 계산하는 커스텀 훅
const useCalculateHighestPopulation = (hotPlaceData, areaData, loading) => {
  // 나이대별로 가장 인기가 많은 장소 계산
  const highestPopulationByAgeGroup = useMemo(
    () => findHighestPopulationByAgeGroup(hotPlaceData),
    [hotPlaceData]
  );

  // 나이대별로 가장 인기가 많은 장소를 우선으로 정렬
  const sortedAreaData = useMemo(() => {
    if (loading || areaData.length === 0) {
      return [];
    }

    // 나이대별 가장 인기 있는 장소 목록에서 중복 제거 및 null 제거
    const highestPlaces = Object.values(highestPopulationByAgeGroup)
      .map((item) => item.place_name)
      .filter((value, index, self) => value && self.indexOf(value) === index);

    // 나이대별 가장 인기 있는 장소 목록에 없는 나머지 장소 리스트
    const remainingPlaces = areaData
      .filter((area) => !highestPlaces.includes(area.area_nm))
      .map((area) => area);

    // 나이대별 인기 장소 + 나머지 장소 리스트 결합하여 반환
    return [
      ...highestPlaces.map((name) =>
        areaData.find((area) => area.area_nm === name)
      ),
      ...remainingPlaces,
    ];
  }, [areaData, highestPopulationByAgeGroup, loading]);

  return { highestPopulationByAgeGroup, sortedAreaData };
};

export default useCalculateHighestPopulation;
