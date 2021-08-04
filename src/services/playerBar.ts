import { BehaviorSubject, filter, fromEvent, map, switchMap } from "rxjs";
import gameStateService, { gameStates } from "./gameState";

class PlayerBarService {
  private playerBarY$ = new BehaviorSubject<number>(0);

  constructor() {
    fromEvent<MouseEvent>(document, 'mousemove').pipe(
      switchMap(event => gameStateService.getGameState().pipe(
        filter(gameState => gameState === gameStates.playing),
        map(() => event)
      ))
    ).subscribe(
      event => {
        const halfPlayfieldY = document.body.offsetHeight / 2;
        const diffPosY = event.offsetY - halfPlayfieldY;
        const halfPlayfieldYNormalized = halfPlayfieldY - 130;
        
        if(diffPosY < halfPlayfieldYNormalized) {
          if(diffPosY > -halfPlayfieldYNormalized) {
            this.playerBarY$.next(diffPosY);
          } else {
            this.playerBarY$.next(-halfPlayfieldYNormalized);
          }
        } else {
          this.playerBarY$.next(halfPlayfieldYNormalized);
        }
      }
    );
  }

  public getPlayerBarY() {
    return this.playerBarY$.asObservable();
  }

  public getStaticPlayerBarY() {
    return this.playerBarY$.value;
  }
}

const playerBarService = new PlayerBarService();

export default playerBarService;