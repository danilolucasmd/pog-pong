import { BehaviorSubject, filter, fromEvent, map, switchMap, tap } from "rxjs";
import { Vector2 } from "../interfaces/core";
import { lerp, variables } from "../utils";
import ballService from "./ball";
import gameStateService, { gameStates } from "./gameState";

class EnemyBarService {
  private enemyDifficulty = 0.06;
  private enemyBarY$ = new BehaviorSubject<number>(0);

  constructor() {
    ballService.getBallPosition().pipe(
      switchMap(ballPosition => gameStateService.getGameState().pipe(
        filter(gameState => gameState === gameStates.playing),
        map(() => ballPosition)
      )),
      map(ballPosition => {
        const halfPlayfieldY = document.body.offsetHeight / 2;
        const halfPlayfieldYNormalized = halfPlayfieldY - variables.barSize.height;

        if(ballPosition.y < halfPlayfieldYNormalized) {
          if(ballPosition.y > -halfPlayfieldYNormalized) {
            return ballPosition.y;
          }
          return -halfPlayfieldYNormalized;
        }
        return halfPlayfieldYNormalized
      })
    ).subscribe(
      ballY => this.enemyBarY$.next(lerp(this.enemyBarY$.value, ballY, this.enemyDifficulty))
    );
  }

  public getEnemyBarY() {
    return this.enemyBarY$.asObservable();
  }

  public getStaticEnemyBarY() {
    return this.enemyBarY$.value;
  }
}

const enemyBarService = new EnemyBarService();

export default enemyBarService;