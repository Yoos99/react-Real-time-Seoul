import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/searchSlice'; // 검색어 설정 액션 가져오기
import styles from './Header.module.scss';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux 디스패치 사용

  // 검색 핸들러
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('검색어:', searchQuery.trim());
      dispatch(setSearchTerm(searchQuery.trim())); // 검색어를 Redux store에 저장
      navigate('/searchpage'); // 검색 페이지로 이동
    }
  };

  // 엔터 키 눌렀을 때 검색 수행
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* 로고 섹션 */}
        <div className={styles.logoSection} onClick={() => navigate('/')}>
          <img
            src="src/img/seoulLogo.svg"
            alt="Lovely Seoul Logo"
            className={styles.logo}
          />
          <span className={styles.title}>
            {/* Lovely <span className={styles.highlight}>SEOUL</span> */}
          </span>
        </div>

        {/* 검색 섹션 */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
            className={styles.searchBox}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            🔍
          </button>
        </div>
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
