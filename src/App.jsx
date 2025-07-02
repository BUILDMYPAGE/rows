import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ApiNotification from './components/ApiNotification';
import DebugPanel from './components/DebugPanel';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import SearchPage from './pages/SearchPage';
import { swapiService } from './services/swapiService';
import './styles/global.css';

// Make swapiService available in browser console for debugging
if (typeof window !== 'undefined') {
  window.swapiService = swapiService;
  window.debugAPI = {
    clearFallback: swapiService.clearFallbackMode,
    testAPI: swapiService.forceApiTest,
    reset: swapiService.debugReset,
    getAvailableIds: swapiService.getAvailableCharacterIds,
    checkStatus: () => {
      console.log('API Status:', {
        usingFallback: swapiService.isUsingFallback(),
        apiWorking: localStorage.getItem('apiWorking'),
        useFallback: localStorage.getItem('useFallback')
      });
    }
  };
}

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
