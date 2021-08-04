import { useObservable } from '../../../hooks';
import gameStateService, { gameStates } from '../../../services/gameState';
import './styles.css';

const GameInfo = () => {
  const [gameState] = useObservable(() => gameStateService.getGameState(), []);

  return (
    <div className='game-info'>
      {gameState === gameStates.none && <label className='game-state-label'>START</label>}
      {gameState === gameStates.win && <label className='game-state-label'>WIN</label>}
      {gameState === gameStates.lose && <label className='game-state-label'>LOSE</label>}
    </div>
  );
};

export default GameInfo;