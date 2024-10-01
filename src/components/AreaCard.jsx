import styles from '../css/AreaCard.module.scss';

const AreaCard = ({ area, onClose }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{area.area_nm}</span>
        {/* 닫기 버튼 추가 */}
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${area.area_nm}.jpg`}
          alt={area.area_nm}
          className={styles.image}
        />
      </div>
      <div className={styles.triangle}></div>
    </div>
  );
};

export default AreaCard;
