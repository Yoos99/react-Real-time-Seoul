export default async function handler(req, res) {
  const { name } = req.query;
  // const apiKey = import.meta.env.VITE_LIVESEOUL_KEY;
  const fesURL = `http://openapi.seoul.go.kr:8088/${process.env.VITE_LIVESEOUL_KEY}/json/citydata/1/5/${name}`;
  try {
    const response = await fetch(fesURL);
    if (!response.ok) {
      throw new Error('Failed to fetch festival data');
    }
    const data = await response.json();
    res.status(200).json(data.CITYDATA.EVENT_STTS);
  } catch (error) {
    console.log('Failed to fetch festival data:', error);
    res
      .status(500)
      .json({ error: '문화행사 데이터를 가져오는 중 오류가 발생했습니다.' });
  }
}
