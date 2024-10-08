export default async function handler(req, res) {
  const { name } = req.query;
  const apiKey = import.meta.env.VITE_LIVESEOUL_KEY;
  const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/5/${name}`;
  console.log(apiUrl);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.status(200).json(data['SeoulRtd.citydata_ppltn'][0]);
  } catch (error) {
    console.error('인구 밀도 데이터를 가져오는 중 오류가 발생했습니다:', error);
    res
      .status(500)
      .json({ error: '인구 밀도 데이터를 가져오는 중 오류가 발생했습니다.' });
  }
}
