import { BehaviorSubject } from "rxjs";
import { Vector2 } from "../interfaces/core";
import { getRandomInt, variables } from "../utils";
import enemyBarService from "./enemyBar";
import gameStateService, { gameStates } from "./gameState";
import playerBarService from "./playerBar";
import scoreService from "./score";

class BallService {
  private ballIncreaseRatio = 0.1;

  private ballPosition: Vector2 = { x: 0, y: 0 };
  private ballDirection: Vector2 = { x: 1, y: 1 };

  private ballPosition$ = new BehaviorSubject<Vector2>({ x: 0, y: 0 });

  constructor() {
    this.resetBall();
  
    setInterval(() => {
      if(gameStateService.getStaticGameState() !== gameStates.playing) {
        return;
      }

      const halfPlayfield: Vector2 = {
        x: (document.body.offsetWidth - variables.barSize.width) / 2,
        y: (document.body.offsetHeight - variables.barSize.height) / 2
      };
      const playerBarY = playerBarService.getStaticPlayerBarY();
      const enemyBarY = enemyBarService.getStaticEnemyBarY();

      this.ballPosition.x += this.ballDirection.x;
      this.ballPosition.y += this.ballDirection.y;

      if(Math.abs(this.ballPosition.x) > halfPlayfield.x) {
        if(this.ballPosition.x < halfPlayfield.x) {
          scoreService.increasePlayerScore();
        } else {
          scoreService.increaseEnemyScore();
        }
        this.resetBall();
      } else {
        if(this.ballPosition.x > (halfPlayfield.x - (variables.barSize.width * 2)) && this.isInsideBarVerticalRange(this.ballPosition, playerBarY)) {
          this.ballDirection.x = -this.ballDirection.x;
        }
        
        if(this.ballPosition.x < (-halfPlayfield.x + (variables.barSize.width * 2)) && this.isInsideBarVerticalRange(this.ballPosition, enemyBarY)) {
          this.ballDirection.x = -this.ballDirection.x;
        }
      }

      if(Math.abs(this.ballPosition.y) > halfPlayfield.y) {
        this.ballDirection.y = -this.ballDirection.y;
      }

      this.ballPosition$.next({...this.ballPosition});
    }, 1);

    setInterval(() => {
      if(gameStateService.getStaticGameState() !== gameStates.playing) {
        return;
      }

      this.increaseBallSpeed();
    }, 1000);
  }

  public getBallPosition() {
    return this.ballPosition$.asObservable();
  }

  private resetBall() {
    this.ballPosition = { x: 0, y: 0 };
    this.ballDirection = { 
      x: getRandomInt(2) === 0 ? 1 : -1,
      y: getRandomInt(2) === 0 ? 1 : -1
    };
  }

  private isInsideBarVerticalRange(ballPosition: Vector2, barY: number) {
    return ballPosition.y > barY - (variables.barSize.height / 2) && ballPosition.y < barY + (variables.barSize.height / 2);
  }

  private increaseBallSpeed() {
    if(this.ballDirection.x < 0) {
      this.ballDirection.x -= this.ballIncreaseRatio;
    } else {
      this.ballDirection.x += this.ballIncreaseRatio;
    }

    if(this.ballDirection.y < 0) {
      this.ballDirection.y -= this.ballIncreaseRatio;
    } else {
      this.ballDirection.y += this.ballIncreaseRatio;
    }
  }
}

const ballService = new BallService();

export default ballService;