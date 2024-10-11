import { useState } from 'react';
import { findHighestAgeGroup } from '../utils/populationCalculate'; // 필요한 유틸리티 함수 가져오기
import styles from './PlaceCard.module.scss'; // 스타일 가져오기
import DonutChart from './DonutChart'; // DonutChart 컴포넌트 가져오기

function PlaceCard({ hotPlace }) {
  const [isExpanded, setIsExpanded] = useState(false); // 카드 확장 여부 상태 관리

  // 가장 인기가 많은 나이대 계산
  const highestAgeGroup = findHighestAgeGroup(hotPlace);
  const congestLvl = hotPlace.AREA_CONGEST_LVL;

  // 혼잡도에 따른 클래스 설정
  const congestionLevelClass = (congestLvl) => {
    switch (congestLvl) {
      case '붐빔':
        return styles['very-crowded'];
      case '약간 붐빔':
        return styles['crowded'];
      case '보통':
        return styles['normal'];
      case '여유':
        return styles['relaxed'];
      default:
        return '';
    }
  };

  // 연령대별 클래스 설정
  const ageGroupClass = (ageGroup) => {
    switch (ageGroup) {
      case '10대':
        return styles['age-10'];
      case '20대':
        return styles['age-20'];
      case '30대':
        return styles['age-30'];
      case '40대':
        return styles['age-40'];
      case '50대':
        return styles['age-50'];
      case '60대':
        return styles['age-60'];
      default:
        return '';
    }
  };

  // 가장 한적한 시간 구하기
  const leastCongestedTime = hotPlace.FCST_PPLTN.reduce((minTime, current) =>
    parseFloat(current.FCST_PPLTN_MIN) < parseFloat(minTime.FCST_PPLTN_MIN)
      ? current
      : minTime
  ).FCST_TIME;

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles.cardImage}>
        <img
          src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${hotPlace.AREA_NM}.jpg`}
          alt={hotPlace.AREA_NM}
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <h2>{hotPlace.AREA_NM}</h2>
        <p>{hotPlace.AREA_CONGEST_MSG}</p> {/* 지역의 혼잡 메시지 */}
        <div className={styles.ppltnInfo}>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <img src="/img/man.svg" alt="Male" />
              {hotPlace.MALE_PPLTN_RATE}%
            </div>
            <div className={styles.metric}>
              <img src="/img/woman.svg" alt="Female" />
              {hotPlace.FEMALE_PPLTN_RATE}%
            </div>
          </div>
          <div className={styles.tags}>
            <span
              className={`${styles.tag} ${congestionLevelClass(
                hotPlace.AREA_CONGEST_LVL
              )}`}
            >
              {congestLvl}
            </span>
            <span
              className={`${styles.ageTag} ${ageGroupClass(highestAgeGroup)}`}
            >
              {highestAgeGroup}에게 인기 많아요!
            </span>
          </div>
        </div>
      </div>

      {/* 카드를 클릭하면 확장된 상태에서 차트를 보여줌 */}
      {isExpanded && (
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>
            {leastCongestedTime.slice(-5)}에 가장 한적해요!
          </h3>
          <DonutChart data={hotPlace} />
        </div>
      )}
    </div>
  );
}

export default PlaceCard;
