import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { HomePage, RepositoryDetailPage, RepositoryListPage } from './pages';
import { RoutesConfig } from './constants';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path={RoutesConfig.REPOSITORY_LIST}
          element={<RepositoryListPage />}
        />
        <Route
          path={RoutesConfig.REPOSITORY_DETAIL}
          element={<RepositoryDetailPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
