export default async function handler(req, res) {
  const apiKey = import.meta.env.VITE_LIVESEOUL_KEY;
  const { place } = req.query;
  const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/5/${place}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    res.status(200).json(data['SeoulRtd.citydata_ppltn']);
  } catch (error) {
    console.error('오류 발생:', error);
    res.status(500).json({ error: 'Failed to fetch population data' });
  }
}
