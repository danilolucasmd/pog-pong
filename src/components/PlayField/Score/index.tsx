import './styles.css';

import { useObservable } from "../../../hooks";
import scoreService from "../../../services/score";

const Score = () => {
  const [score] = useObservable(() => scoreService.getScore(), []);

  return (
    <div className='score-container'>
      <div className='score'>
        <label className='score-label'>{score?.enemy}</label>
      </div>
      <div className='score'>
        <label className='score-label'>{score?.player}</label>
      </div>
    </div>
  );
};

export default Score;