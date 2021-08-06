import { BehaviorSubject } from "rxjs";

interface IScore {
  player: number;
  enemy: number;
}

class ScoreService {
  private score$ = new BehaviorSubject<IScore>({ player: 0, enemy: 0 });

  public getScore() {
    return this.score$.asObservable();
  }
  
  public increasePlayerScore() {
    this.score$.next({
      ...this.score$.value,
      player: this.score$.value.player + 1
    });
  }
  
  public increaseEnemyScore() {
    this.score$.next({
      ...this.score$.value,
      enemy: this.score$.value.enemy + 1
    });
  }

  public resetScore() {
    this.score$.next({ player: 0, enemy: 0 });
  }
}

const scoreService = new ScoreService();

export default scoreService;