import { useObservable } from 'react-use-observable';
import ballService from '../../../services/ball';
import './styles.css';

const Ball = () => {
  const [ballPosition] = useObservable(() => ballService.getBallPosition(), []);

  return <div className='ball' style={{ transform: `translate(${ballPosition?.x}px, ${ballPosition?.y}px)` }} />;
};

export default Ball;