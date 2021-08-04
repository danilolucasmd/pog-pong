import './styles.css';

import PlayerBar from './PlayerBar';
import EnemyBar from './EnemyBar';
import Ball from './Ball';
import Score from './Score';
import GameInfo from './GameInfo';

const Playfield = () => {
  return (
    <div className='playfield'>
      <div className='top' />
      <div className='middle'>
        <EnemyBar />
        <div className='dotted-line' />
        <Ball />
        <PlayerBar />
      </div>
      <div className='bottom' />
      <Score />
      <GameInfo />
    </div>
  );
};

export default Playfield;