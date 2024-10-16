# 실시간 서울 관광 프로젝트

실제 메인 홈페이지 - https://reactrealseoul.vercel.app/

![image](https://github.com/user-attachments/assets/53e13d6a-d261-4aa1-91a5-f37aad2d1a8a)

## 기획배경

서울은 다양한 명소와 상권이 모여있는 도시로, 많은 사람들이 각기 다른 목적과 요구에 맞춰 서울을 방문합니다. 하지만 기존의 관광 정보 플랫폼들은 주로 인기 명소와 대규모 행사 정보에 중점을 두고 있어, 실시간으로 장소의 혼잡도를 알거나 사용자에게 맞춤형 추천을 제공하는 기능은 제한적입니다.

**주요 목적:**

1. **실시간 인구 혼잡도 분석**: 서울의 주요 명소가 혼잡한지 여부를 실시간으로 확인할 수 있어, 혼잡한 시간을 피해 한적한 시간을 선택할 수 있습니다.
2. **맞춤형 상권 분석 및 추천**: 성비 및 연령대 정보를 기반으로 사용자가 자신과 비슷한 나이대의 사람들이 많은 상권을 찾고, 이를 바탕으로 서울의 명소를 추천받을 수 있습니다.
3. **한적한 시간 선택 지원**: 혼잡한 장소를 피하고 싶은 사용자들에게 실시간 분석을 통해 더 적합한 방문 시간대를 제시합니다.

이 플랫폼은 서울 시민과 관광객들이 실시간 데이터를 통해 자신에게 맞는 핫플레이스를 추천받고, 혼잡도를 고려해 더 여유롭고 즐거운 서울을 경험할 수 있도록 돕는 것을 목표로 합니다.

## 타겟 사용자

- **일반 시민**

  - 특정 시간대의 인구 밀집도를 확인해 혼잡한 구역을 피해 방문하려는 시민
  - 성비와 연령대 정보를 바탕으로 자신에게 맞는 상권을 찾고 싶어 하는 시민
  - 지역 행사 정보를 통해 즐길 거리를 찾는 시민

- **관광객**

  - 서울 여행 중 자신과 비슷한 연령대, 성비가 높은 상권을 찾아 문화와 트렌드를 체험하고자 하는 관광객
  - 혼잡하지 않은 시간대와 장소를 선택해 쾌적한 여행을 계획하는 방문자
  - 지역 행사를 통해 서울의 문화를 경험하고자 하는 외부 관광객

- **청년 및 대학생**

  - 20~30대 인구가 많이 모이는 트렌디한 상권을 찾아 놀거리를 찾고자 하는 청년층
  - 비슷한 또래가 많은 지역을 방문해 새로운 사람들과 소통하고 싶은 대학생

- **중장년층**
  - 나이대에 맞는 상권과 조용한 분위기의 지역을 선호하는 중장년층
  - 자신과 비슷한 성향을 가진 사람들이 많은 지역을 방문해 안전하고 편안한 쇼핑 및 관광을 원하는 중장년층

## 핵심 서비스

- **인구 혼잡도 실시간 분석**
  - 특정 지역의 인구 밀집도를 실시간으로 제공하여 사용자가 혼잡한 시간대와 구역을 피할 수 있도록 지원
  - 시간대별 인구 변화를 시각화하여 보다 효율적인 방문 계획을 돕는 기능
- **실시간 상권 분석**
  - **상권별 성비 및 연령대** 정보를 제공하여 사용자들이 자신과 비슷한 성향의 사람들이 많은 상권을 찾을 수 있도록 지원
  - 비슷한 나이대와 성별을 가진 사람들이 모이는 상권을 분석해, 사용자에게 맞춤형 추천 관광지나 쇼핑 장소를 제안
  - 사용자가 나이대, 성별, 인구 분포를 고려해 자신에게 가장 적합한 상권을 선택하도록 돕는 서비스
- **지역 행사 정보 제공**
  - 현재 진행 중인 지역 행사를 실시간으로 제공하여 사용자가 관심 있는 문화 행사나 체험 활동에 쉽게 참여할 수 있도록 안내
  - 각 행사에 대한 시간, 위치, 테마 정보를 제공하여 사용자의 선택을 돕는 기능
- **웹사이트 접속시 오늘의 핫플**
  - 각 나이대 별로 핫플 노출
  - 가장 혼잡도가 높은 장소 별도 노출
- **자주 놀러가는 장소 북마크 기능**
  - 내가 북마크한 장소 모아보기 제공
- **방문 장소 기준 근처 행사 정보 제공**

## 유사 서비스 UI

- https://data.seoul.go.kr/SeoulRtd/
  ![image](https://github.com/user-attachments/assets/333e5486-1bf6-4562-93bb-98b45f3f91a3)

1. **메인화면 지도 + 장소 마킹**

   카카오 지도 API를 이용해서 장소별 마킹 기능을 제공할 수 있게끔 개발

2. **혼잡도 표기 디자인**

   색 등으로 혼잡도별 시각적 차이를 두어 정보 제공

3. **화면 배치**

   장소 마커 클릭시 좌측에 상세 페이지 나타남 (네이버 지도 UI와 흡사함)

4. **데이터 통계 그래프**

   인구 데이터 통계는 도넛 그래프와 막대 그래프를 활용

## 플로우차트

![image](https://github.com/user-attachments/assets/7b92be0a-259a-4483-93e0-60c4d1775e62)

## 코딩 컨벤션

### 폴더 구조

```tsx
src/
  ├── components/
  │   ├── common/
	│   │    ├── common.jsx
	│   │    └── styles.module.scss
  │   ├── layout/
  │   └── features/
  ├── pages/
  ├── hooks/
  ├── utils/
  └── assets/
```

### 파일 명명 규칙

- 컴포넌트: PascalCase (예: `Button.jsx`, `UserProfile.jsx`)
- 유틸리티, 훅: camelCase (예: `useForm.js`, `formatDate.js`)
- 스타일: 컴포넌트 이름과 동일하게 (예: `Button.module.css`)

### 클래스 명명 규칙

- BEM(Block Element Modifier) 방식 사용
- 예: `button`, `button__icon`, `button--large`

### 코드 스타일 가이드

- ESLint와 Prettier 사용
- 함수형 컴포넌트와 Hooks 사용 권장
- 주석은 1기능에 1~2줄

### 상태 관리 전략

- 로컬 상태: useState
- 전역 상태: Zustand
- 서버 상태: React Query
  - 사용자 정의 훅 : useFetch
  ```tsx
  import { useQuery } from '@tanstack/react-query';
  import ky from 'ky';

  const useFetch = (url) => {
    return useQuery({
      queryKey: [url],
      queryFn: async () => {
        const response = await ky.get(url).json();
        return response;
      },
    });
  };

  export default useFetch;
  ```
- **반복되는 훅 사용은 사용자 정의 훅으로 정의해서 사용**

### 라이브러리

- **react**
- **react-router-dom** (라우팅)
- **ky** (http 통신)
- **zustand** (전역 상태 관리)
- **sass** (스타일)
- **dotenv** (환경 변수)
- **react-spinners** (스피너)
- **@tanstack/react-query** (서버 상태 관리)
- **styled-components** (스타일, CSS-in-JS)
- [Nivo.rocks](http://Nivo.rocks) (그래프)
