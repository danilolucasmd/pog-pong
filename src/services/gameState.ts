import { BehaviorSubject } from "rxjs";
import ballService from "./ball";
import scoreService from "./score";

export const gameStates = {
  none: 0,
  playing: 1,
  win: 2,
  lose: 3
};

const winPoints = 3;

class GameStateService {
  private gameState$ = new BehaviorSubject<number>(gameStates.none);

  constructor() {
    scoreService.getScore().subscribe(
      score => {
        if(score.player >= winPoints) {
          this.win();
        }

        if(score.enemy >= winPoints) {
          this.lose();
        }
      }
    );
  }

  public getGameState() {
    return this.gameState$.asObservable();
  }

  public getStaticGameState() {
    return this.gameState$.value;
  }

  public play() {
    if(this.gameState$.value !== gameStates.playing) {
      scoreService.resetScore();
      this.gameState$.next(gameStates.playing);
    }
  }

  public win() {
    this.gameState$.next(gameStates.win);
  }

  public lose() {
    this.gameState$.next(gameStates.lose);
  }
}

const gameStateService = new GameStateService();

export default gameStateService;