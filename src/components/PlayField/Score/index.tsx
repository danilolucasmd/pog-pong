import './styles.css';

import scoreService from "../../../services/score";
import { useObservable } from 'react-use-observable';

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