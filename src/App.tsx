import { useEffect } from 'react';
import './App.css';
import Playfield from './components/PlayField';
import gameStateService from './services/gameState';

function App() {
  useEffect(() => {
    document.addEventListener('click', () => {
      gameStateService.play();
    });
  }, []);

  return (
    <div className='container'>
      <div className='header'>
        <label className='game-name'>POG PONG</label>
      </div>
      <Playfield />
    </div>
  );
}

export default App;
