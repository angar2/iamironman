import Phaser from 'phaser';
import StateManager from '../managers/stateManager';
import TimerHandler from '../handlers/timerHandler';
import GroupManager from '../managers/groupManager';
import ScoreManager from '../managers/displays/scoreManager';
import GaugeManager from '../managers/displays/gaugeManager';
import IronmanManager from '../managers/charaters/ironmanManager';
import HealthManager from '../managers/displays/healthManager';
import RepulsorManager from '../managers/weapons/repulsorManager';
import BeamManager from '../managers/weapons/beamManager';
import IronmanControlManager from '../managers/charaters/ironmanControlManager';
import UltronRepulsorManager from '../managers/weapons/ultronRepulsorManager';
import EnemyManager from '../managers/charaters/enemyManager';
import CollisionHandler from '../handlers/collisionHandler';
import KeyHandler from '../handlers/keyHandler';

export default class PlayScene extends Phaser.Scene {
  private stateManager!: StateManager;
  private timerHandler!: TimerHandler;
  private groupManager!: GroupManager;
  private scoreManager!: ScoreManager;
  private gaugeManager!: GaugeManager;
  private ironmanManager!: IronmanManager;
  private healthManager!: HealthManager;
  private repulsorManager!: RepulsorManager;
  private beamManager!: BeamManager;
  private ironmanControlManager!: IronmanControlManager;
  private ultronRepulsorManager!: UltronRepulsorManager;
  private enemyManager!: EnemyManager;
  private collisionHandler!: CollisionHandler;
  private keyHandler!: KeyHandler;

  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {}

  create() {
    // 디버그 그래픽 설정
    // this.physics.world.createDebugGraphic().setDepth(10);

    // 상태 관리자
    this.stateManager = new StateManager();

    // 그룹 관리자
    this.groupManager = new GroupManager(this);

    // 충돌 감지 핸들러
    this.collisionHandler = new CollisionHandler(this);

    // 타이머 핸들러
    this.timerHandler = new TimerHandler(this);

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
      this.timerHandler,
      this.ironmanManager
    );

    // 울트론 리펄서 관리자
    this.ultronRepulsorManager = new UltronRepulsorManager(
      this,
      this.stateManager,
      this.collisionHandler,
      this.groupManager,
      this.ironmanManager,
      this.healthManager
    );

    // 빌런 관리자
    this.enemyManager = new EnemyManager(
      this,
      this.stateManager,
      this.collisionHandler,
      this.timerHandler,
      this.groupManager,
      this.scoreManager,
      this.gaugeManager,
      this.ironmanManager,
      this.healthManager,
      this.ultronRepulsorManager
    );

    // 리펄서 관리자
    this.repulsorManager = new RepulsorManager(
      this,
      this.collisionHandler,
      this.groupManager,
      this.ironmanManager,
      this.enemyManager
    );

    // 빔 관리자
    this.beamManager = new BeamManager(
      this,
      this.collisionHandler,
      this.groupManager,
      this.ironmanManager,
      this.enemyManager
    );

    // 아이언맨 조작 관리자
    this.ironmanControlManager = new IronmanControlManager(
      this,
      this.stateManager,
      this.gaugeManager,
      this.ironmanManager,
      this.repulsorManager,
      this.beamManager
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
    this.scoreManager.increaseScore();

    // 아이언맨 이동
    this.keyHandler.updateIronmanPosition();

    // 빌런 이동
    this.enemyManager.updatePosition();

    // 리펄서 이동
    this.repulsorManager.updatePosition();

    // 빔 이동
    this.beamManager.updatePosition();

    // 울트론2 리펄서 이동
    this.ultronRepulsorManager.updatePosition();

    // 아이언맨 체력 소진 시 일시정지
    if (this.healthManager.checkDepleted()) {
      this.scene.pause();
      this.scene.pause('BackScene');
      this.scene.launch('OverScene');
    }
  }
}
