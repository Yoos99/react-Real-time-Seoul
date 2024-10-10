export default async function handler(req, res) {
  const dataUrl =
    'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch area data');
    }
    const data = await response.json();
    res.status(200).json(data.row);
  } catch (error) {
    console.log('Failed to fetch area data:', error);
    res
      .status(500)
      .json({ error: '지역 데이터를 가져오는 중 오류가 발생했습니다.' });
  }
}
