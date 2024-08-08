import Phaser from 'phaser';
import StateManager from '../managers/stateManager';
import CollisionHandler from '../handlers/collisionHandler';
import TimerHandler from '../handlers/timerHandler';
import GroupManager from '../managers/groupManager';
import BackgroundManager from '../managers/displays/backgroundManager';
import ScoreManager from '../managers/displays/scoreManager';
import GaugeManager from '../managers/displays/gaugeManager';
import IronmanManager from '../managers/charaters/ironmanManager';
import HealthManager from '../managers/displays/healthManager';
import RepulsorManager from '../managers/weapons/repulsorManager';
import BeamManager from '../managers/weapons/beamManager';
import UltronRepulsorManager from '../managers/weapons/ultronRepulsorManager';
import EnemyManager from '../managers/charaters/enemyManager';
import IronmanControlManager from '../managers/charaters/ironmanControlManager';
import KeyHandler from '../handlers/keyHandler';
import { scoreConfig } from '../config';
import { ImageTexture } from '../enum';

export default class MainScene extends Phaser.Scene {
  private stateManager!: StateManager;
  private collisionHandler!: CollisionHandler;
  private timerHandler!: TimerHandler;
  private groupManager!: GroupManager;
  private backgroundManager!: BackgroundManager;
  private scoreManager!: ScoreManager;
  private gaugeManager!: GaugeManager;
  private ironmanManager!: IronmanManager;
  private healthManager!: HealthManager;
  private repulsorManager!: RepulsorManager;
  private beamManager!: BeamManager;
  private ultronRepulsorManager!: UltronRepulsorManager;
  private enemyManager!: EnemyManager;
  private ironmanControlManager!: IronmanControlManager;
  private keyHandler!: KeyHandler;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.setBaseURL('images');

    Object.entries(ImageTexture).forEach(([key, value]) => {
      this.load.image(value, `${value}.png`);
    });
  }

  create() {
    // 디버그 그래픽 설정
    this.physics.world.createDebugGraphic().setDepth(10);

    // 상태 관리자
    this.stateManager = new StateManager();

    // 충돌 감지 핸들러
    this.collisionHandler = new CollisionHandler(this, this.stateManager);

    // 타이머 핸들러
    this.timerHandler = new TimerHandler(this);

    // 그룹 관리자
    this.groupManager = new GroupManager(this);

    // 배경 관리자
    this.backgroundManager = new BackgroundManager(this);

    // 스코어 관리자
    this.scoreManager = new ScoreManager(this);

    // 게이지 관리자
    this.gaugeManager = new GaugeManager(this, this.stateManager);

    // 아이언맨 관리자
    this.ironmanManager = new IronmanManager(this, this.timerHandler);

    // 체력 관리자
    this.healthManager = new HealthManager(
      this,
      this.stateManager,
      this.collisionHandler,
      this.timerHandler,
      this.groupManager,
      this.ironmanManager
    );

    // 리펄서 관리자
    this.repulsorManager = new RepulsorManager(
      this,
      this.groupManager,
      this.ironmanManager
    );

    // 빔 관리자
    this.beamManager = new BeamManager(
      this,
      this.stateManager,
      this.groupManager,
      this.gaugeManager,
      this.ironmanManager
    );

    // 울트론 리펄서 관리자
    this.ultronRepulsorManager = new UltronRepulsorManager(
      this,
      this.groupManager
    );

    // 빌런 관리자
    this.enemyManager = new EnemyManager(
      this,
      this.collisionHandler,
      this.timerHandler,
      this.groupManager,
      this.scoreManager,
      this.gaugeManager,
      this.ironmanManager,
      this.ultronRepulsorManager
    );

    // 아이언맨 조작 관리자
    this.ironmanControlManager = new IronmanControlManager(
      this,
      this.stateManager,
      this.collisionHandler,
      this.groupManager,
      this.ironmanManager,
      this.healthManager,
      this.repulsorManager,
      this.beamManager,
      this.enemyManager
    );

    // 키 이벤트 핸들러
    this.keyHandler = new KeyHandler(
      this,
      this.ironmanManager,
      this.ironmanControlManager
    );
  }

  update() {
    // 스코어 업데이트
    this.scoreManager.increaseScore(scoreConfig.normal);

    // 배경 이동
    this.backgroundManager.updatePosition();

    // 아이언맨 이동
    this.keyHandler.updateIronmanPosition();

    // 빌런 이동
    this.enemyManager.updatePosition();

    // 리펄서 이동
    this.repulsorManager.updatePosition();

    // 유니빔 이동
    this.beamManager.updatePosition();

    // 울트론2 리펄서 이동
    this.ultronRepulsorManager.updatePosition();

    // 아이언맨 공격 감지
    this.ironmanControlManager.setupAttackDetector();
  }
}
