import Phaser from 'phaser';
import StateManager from '../stateManager';
import CollisionHandler from '../../handlers/collisionHandler';
import TimerHandler from '../../handlers/timerHandler';
import GroupManager from '../groupManager';
import IronmanManager from '../charaters/ironmanManager';
import UltronRepulsor from '../../objects/weapons/ultronRepulsor';
import Group from '../../objects/group';
import Health from '../../objects/displays/health';
import Ironman from '../../objects/charaters/ironman';
import Enemy from '../../objects/charaters/enemy';
import {
  GroupType,
  HandlerName,
  StateName,
  ImageTexture,
  IronmanMode,
} from '../../enum';

export default class HealthManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private collisionHandler: CollisionHandler;
  private timerHandler: TimerHandler;
  private ironmanManager: IronmanManager;
  private ironman: Ironman;
  private enemies: Group;
  private ultronRepulsors: Group;
  private lives: Health[];

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    collisionHandler: CollisionHandler,
    timerHandler: TimerHandler,
    groupManager: GroupManager,
    ironmanManager: IronmanManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.collisionHandler = collisionHandler;
    this.timerHandler = timerHandler;
    this.ironmanManager = ironmanManager;
    this.ironman = ironmanManager.get();
    this.enemies = groupManager.get(GroupType.ENEMIES);
    this.ultronRepulsors = groupManager.get(GroupType.ULTORON_REPULSORS);
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

    // 기존 피격 감지 핸들러 제거
    let handler = this.collisionHandler.getOverlapHandler(
      HandlerName.HIT_ENEMIES
    );
    if (handler)
      this.collisionHandler.removeOverlapHandler(
        HandlerName.HIT_ENEMIES,
        handler
      );

    handler = this.collisionHandler.getOverlapHandler(
      HandlerName.HIT_ULTRON_REPULSOR
    );
    if (handler)
      this.collisionHandler.removeOverlapHandler(
        HandlerName.HIT_ULTRON_REPULSOR,
        handler
      );

    this.timerHandler.handleIronmanHitSetup(() => {
      // 무적 상태 활성화
      this.stateManager.updateState(StateName.IS_INVINCIBLE, false);

      // 아이언맨 피격 감지 핸들러 등록
      this.collisionHandler.handleHit(
        this.ironman.collisionZones,
        { enemies: this.enemies, ultronRepulsors: this.ultronRepulsors },
        (ironman: Phaser.Physics.Arcade.Image, target: Enemy | UltronRepulsor) => {
          this.ironmanManager.transform(IronmanMode.HIT); // 아이언맨 모드 변환
          this.decrease(); // 아이언맨 데미지 처리
          if (target instanceof UltronRepulsor) target.destroy(); // 울트론 리펄서일 경우 제거
        }
      );
    });
  }
}
