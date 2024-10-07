import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // react-router-dom에서 필요한 모듈 가져오기
import MainPage from '../src/pages/MainPage';
import SearchPage from '../src/pages/SearchPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />{' '}
          {/* 기본 경로로 MainPage 렌더링 */}
          <Route path="/searchpage" element={<SearchPage />} />{' '}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
