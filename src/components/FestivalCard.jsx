import styles from './FestivalCard.module.scss';

const FestivalCard = ({ festival, onClose }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={festival.THUMBNAIL || '/img/default-festival.jpg'} // 이미지가 없을 경우 기본 이미지
          alt={festival.EVENT_NM}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{festival.EVENT_NM}</span>
        <span className={styles.date}>{festival.EVENT_PERIOD}</span>{' '}
        {/* 행사 기간 표시 */}
        <span className={styles.place}>{festival.EVENT_PLACE}</span>{' '}
        {/* 행사 장소 */}
        {/* 닫기 버튼 추가 */}
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
      <div className={styles.triangle}></div> {/* 삼각형 모양 추가 */}
    </div>
  );
};

export default FestivalCard;
