import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { VoteProvider } from './context/VoteContext';
import Home from './pages/Home';
import VerifyNID from './pages/VerifyNID';
import VotingPage from './pages/VotingPage';
import ResultPage from './pages/ResultPage';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <VoteProvider>
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<VerifyNID />} />
            <Route path="/vote" element={<VotingPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Router>
      </VoteProvider>
    </ThemeProvider>
  );
}

export default App;