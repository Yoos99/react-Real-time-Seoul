// Function to find the highest population age group in a given place
export const findHighestAgeGroup = (populationData) => {
  if (!populationData) return null;

  const ageRates = {
    '10대': parseFloat(populationData.PPLTN_RATE_10),
    '20대': parseFloat(populationData.PPLTN_RATE_20),
    '30대': parseFloat(populationData.PPLTN_RATE_30),
    '40대': parseFloat(populationData.PPLTN_RATE_40),
    '50대': parseFloat(populationData.PPLTN_RATE_50),
    '60대': parseFloat(populationData.PPLTN_RATE_60),
  };

  return Object.keys(ageRates).reduce((a, b) =>
    ageRates[a] > ageRates[b] ? a : b
  );
};

export const generateDescriptionDetails = (hotPlaceData, hotPlaceLoading) => {
  if (hotPlaceLoading) {
    return {
      highestAgeGroup: '데이터를 불러오는 중입니다...',
      congestionLevel: '데이터를 불러오는 중입니다...',
    };
  }

  if (!hotPlaceData) {
    return {
      highestAgeGroup: '해당 지역에 대한 정보가 없습니다.',
      congestionLevel: '해당 지역에 대한 정보가 없습니다.',
    };
  }

  // Find the age group with the highest population ratio
  const highestAgeGroup = findHighestAgeGroup(hotPlaceData);

  return { highestAgeGroup };
};

// Function to find the highest population ratio by age group for all places
export const findHighestPopulationByAgeGroup = (hotPlaceData) => {
  if (!hotPlaceData) return {};

  // Initialize an object to store highest population places by age group
  const highestPopulationPlaces = {
    '10대': { place_name: null, population_ratio: -1 },
    '20대': { place_name: null, population_ratio: -1 },
    '30대': { place_name: null, population_ratio: -1 },
    '40대': { place_name: null, population_ratio: -1 },
    '50대': { place_name: null, population_ratio: -1 },
    '60대': { place_name: null, population_ratio: -1 },
  };

  // Loop through each place and update highest population places by age group
  Object.keys(hotPlaceData).forEach((areaName) => {
    const areaData = hotPlaceData[areaName];
    ['10대', '20대', '30대', '40대', '50대', '60대'].forEach((ageGroup) => {
      const ageKey = `PPLTN_RATE_${ageGroup.replace('대', '')}`;
      const populationRatio = parseFloat(areaData[ageKey]);
      if (
        populationRatio > highestPopulationPlaces[ageGroup].population_ratio
      ) {
        highestPopulationPlaces[ageGroup] = {
          place_name: areaName,
          population_ratio: populationRatio,
        };
      }
    });
  });

  return highestPopulationPlaces;
};
