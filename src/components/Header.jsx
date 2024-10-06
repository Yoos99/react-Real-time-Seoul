import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      {/* 로고 섹션 */}
      <div className={styles.logoSection}>
        <img
          src="/path/to/logo.png"
          alt="Lovely Seoul Logo"
          className={styles.logo}
        />
        <span className={styles.title}>
          Lovely <span className={styles.highlight}>SEOUL</span>
        </span>
      </div>

      {/* 검색 섹션 */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          className={styles.searchBox}
        />
        <button className={styles.searchButton}>🔍</button>
      </div>

      {/* 사용자 섹션 */}
      <div className={styles.userSection}>
        <button className={styles.myButton}>
          <span className={styles.heartIcon}>❤️</span> MY
        </button>
      </div>
    </header>
  );
}

export default Header;
