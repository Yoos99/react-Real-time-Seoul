// fetchApi.js
import ky from 'ky';

// 서버리스 함수로 변경된 API 호출

// 지역 데이터를 가져오는 함수
export const fetchAreaData = async () => {
  const url = `/api/fetchAreaData`;
  try {
    const response = await ky.get(url).json();
    return response;
  } catch (error) {
    console.error('지역 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('지역 데이터를 가져오는 중 오류가 발생했습니다.');
  }
};

// 문화행사 데이터를 가져오는 함수
export const fetchFestivalData = async (name) => {
  if (!name) return;

  const url = `/api/fetchFestivalData?name=${name}`;
  try {
    const response = await ky.get(url).json();
    return response;
  } catch (error) {
    console.error('문화행사 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('문화행사 데이터를 가져오는 중 오류가 발생했습니다.');
  }
};

// 인구 밀도 데이터를 가져오는 함수
export const fetchHotPlace = async (place) => {
  console.log('fetchApi__hotplace 함수 호출됨:', name);
  if (!place) return;

  const url = `/api/fetchHotPlace?place=${place}`;
  try {
    const response = await ky.get(url).json();
    console.log(response);
    return response; // 인구 밀도 정보 반환
  } catch (error) {
    console.error('fetchApi_인구 밀도 데이터 오류 발생!!!!!!:', error);
    throw new Error('인구 밀도 데이터 오류가 발생.');
  }
};
