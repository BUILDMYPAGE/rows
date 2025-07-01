import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ApiNotification from './components/ApiNotification';
import DebugPanel from './components/DebugPanel';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import SearchPage from './pages/SearchPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ApiNotification />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </main>
        <DebugPanel />
      </div>
    </Router>
  );
}

export default App
