import './styles.css';

import { map } from 'rxjs';
import { useObservable } from '../../../hooks';
import playerBarService from '../../../services/playerBar';

const PlayerBar = () => {
  const [playerBarY] = useObservable(() => playerBarService.getPlayerBarY(), []);

  return <div className='bar' style={{ transform: `translateY(${playerBarY}px)` }} />;
};

export default PlayerBar;