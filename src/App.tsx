import './App.css';
import Playfield from './components/PlayField';

function App() {
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
