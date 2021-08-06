import { useObservable } from 'react-use-observable';
import enemyBarService from '../../../services/enemyBar';
import './styles.css';

const EnemyBar = () => {
  const [barY] = useObservable(() => enemyBarService.getEnemyBarY(), []);

  return <div className='bar' style={{ transform: `translateY(${barY}px)` }} />;
};

export default EnemyBar;