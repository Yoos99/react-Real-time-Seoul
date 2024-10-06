// api.js
import ky from 'ky';

const apiKey = import.meta.env.VITE_LIVESEOUL_KEY;

export const fetchAreaData = async () => {
  const dataUrl =
    'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';
  try {
    const response = await ky.get(dataUrl).json();
    // console.log(response.row);
    //console.log(response.row.map((item) => item.area_nm)[0]);
    return response.row;
  } catch (error) {
    console.error('지역 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('지역 데이터를 가져오는 중 오류가 발생했습니다.');
  }
};

export const fetchFestivalData = async (name) => {
  if (!name) return;

  const fesURL = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${name}`;
  try {
    const response = await ky.get(fesURL).json();
    return response.CITYDATA.EVENT_STTS;
  } catch (error) {
    console.error('문화행사 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('문화행사 데이터를 가져오는 중 오류가 발생했습니다.');
  }
};
