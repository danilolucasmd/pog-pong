import './styles.css';

import playerBarService from '../../../services/playerBar';
import { useObservable } from 'react-use-observable';

const PlayerBar = () => {
  const [playerBarY] = useObservable(() => playerBarService.getPlayerBarY(), []);

  return <div className='bar' style={{ transform: `translateY(${playerBarY}px)` }} />;
};

export default PlayerBar;