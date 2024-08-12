import Phaser from 'phaser';
import StateManager from '../stateManager';
import TimerHandler from '../../handlers/timerHandler';
import IronmanManager from '../charaters/ironmanManager';
import Health from '../../objects/displays/health';
import Ironman from '../../objects/charaters/ironman';
import { StateName, ImageTexture } from '../../enum';

export default class HealthManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private timerHandler: TimerHandler;
  private ironman: Ironman;
  private lives: Health[];

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    timerHandler: TimerHandler,
    ironmanManager: IronmanManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.timerHandler = timerHandler;
    this.ironman = ironmanManager.get();
    this.lives = [];

    this.createLives();
  }

  // 아이언맨 체력 생성
  public createLives() {
    const gameWidth = this.scene.game.canvas.width;
    const gameHeight = this.scene.game.canvas.height;

    this.lives = Array.from({ length: this.ironman.getHealth() }, (_, i) => {
      const health = new Health(this.scene, 0, 0, ImageTexture.HEALTH);

      const spacing = (i * health.displayWidth) / 1.3;

      health.setPosition(gameWidth / 29 + spacing, gameHeight / 20);

      return health;
    });
  }

  // 아이언맨 체력 감소
  public decrease() {
    const isInvincible = this.stateManager.getState(StateName.IS_INVINCIBLE);
    if (isInvincible) return;

    if (this.lives.length > 0) {
      const health = this.lives.pop();
      if (health) health.destroy();
      this.stateManager.updateState(StateName.IS_INVINCIBLE, true);
    }

    this.timerHandler.handleIronmanHitSetup(() => {
      // 무적 상태 활성화
      this.stateManager.updateState(StateName.IS_INVINCIBLE, false);
    });
  }

  // 아이언맨 체력 소진 확인
  public checkDepleted() {
    return this.lives.length <= 0;
  }
}
