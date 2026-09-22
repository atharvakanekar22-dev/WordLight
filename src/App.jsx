import { GameProvider, useGame, GAME_PHASES } from './game/GameContext';
import LandingScreen from './components/LandingScreen';
import GameScreen from './components/GameScreen';
import GiftScreen from './components/GiftScreen';
import ResultsScreen from './components/ResultsScreen';
import ResumePrompt from './components/ResumePrompt';
import './index.css';
import './styles/animations.css';
import './styles/components.css';
import './styles/home.css';

function AppContent() {
  const { phase, showResumePrompt } = useGame();

  if (showResumePrompt) {
    return <ResumePrompt />;
  }

  switch (phase) {
    case GAME_PHASES.LANDING:
      return <LandingScreen />;
    case GAME_PHASES.PLAYING:
      return <GameScreen />;
    case GAME_PHASES.GIFT:
      return <GiftScreen />;
    case GAME_PHASES.RESULTS:
      return <ResultsScreen />;
    default:
      return <LandingScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <div className="app-wrapper">
        <AppContent />
      </div>
    </GameProvider>
  );
}

export default App;
