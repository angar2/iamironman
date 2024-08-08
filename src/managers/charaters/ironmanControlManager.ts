import Phaser from 'phaser';
import StateManager from '../stateManager';
import CollisionHandler from '../../handlers/collisionHandler';
import GroupManager from '../groupManager';
import IronmanManager from './ironmanManager';
import HealthManager from '../displays/healthManager';
import RepulsorManager from '../weapons/repulsorManager';
import BeamManager from '../weapons/beamManager';
import EnemyManager from './enemyManager';
import Group from '../../objects/group';
import Ironman from '../../objects/charaters/ironman';
import Repulsor from '../../objects/weapons/repulsor';
import Beam from '../../objects/weapons/beam';
import UltronRepulsor from '../../objects/weapons/ultronRepulsor';
import Enemy from '../../objects/charaters/enemy';
import { maxConfig, speedConfig } from '../../config';
import { GroupType, IronmanMode, StateName } from '../../enum';

export default class IronmanControlManager {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private collisionHandler: CollisionHandler;
  private ironmanManager: IronmanManager;
  private healthManager: HealthManager;
  private repulsorManager: RepulsorManager;
  private beamManager: BeamManager;
  private enemyManager: EnemyManager;
  private enemies: Group;
  private weapons: Group;
  private ultronRepulsors: Group;
  private ironman: Ironman;

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    collisionHandler: CollisionHandler,
    groupManager: GroupManager,
    ironmanManager: IronmanManager,
    healthManager: HealthManager,
    repulsorManager: RepulsorManager,
    beamManager: BeamManager,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.collisionHandler = collisionHandler;
    this.ironmanManager = ironmanManager;
    this.healthManager = healthManager;
    this.repulsorManager = repulsorManager;
    this.beamManager = beamManager;
    this.enemyManager = enemyManager;
    this.enemies = groupManager.get(GroupType.ENEMIES);
    this.weapons = groupManager.get(GroupType.WEAPONS);
    this.ultronRepulsors = groupManager.get(GroupType.ULTORON_REPULSORS);
    this.ironman = ironmanManager.get();

    this.setupHitDetector();
  }

  // 아이언맨 피격 감지 핸들러 등록
  private setupHitDetector() {
    this.collisionHandler.handleHit(
      this.ironman,
      { enemies: this.enemies, ultronRepulsors: this.ultronRepulsors },
      (ironman: Ironman, target: Enemy | UltronRepulsor) => {
        this.ironmanManager.transform(IronmanMode.HIT); // 아이언맨 모드 변환
        this.healthManager.decrease(); // 아이언맨 데미지 처리
        if (target instanceof UltronRepulsor) target.destroy(); // 울트론 리펄서일 경우 제거
      }
    );
  }

  // 아이언맨 공격 감지 핸들러 등록
  public setupAttackDetector() {
    this.collisionHandler.handleAttack(
      this.enemies,
      this.weapons,
      (enemy: Enemy, weapon: Repulsor | Beam) => {
        this.enemyManager.damage(enemy, weapon); // 빌런 데미지 처리
      },
      (weapon: Repulsor | Beam) => {
        if (weapon instanceof Repulsor) weapon.destroy(); // 리펄서일 경우 제거
      }
    );
  }

  // 아이언맨 이동
  public updatePosition(isUpdown: boolean, isPlus: boolean) {
    const speed = isPlus ? speedConfig.ironman : -speedConfig.ironman;

    isUpdown
      ? this.ironman.setVelocityY(speed)
      : this.ironman.setVelocityX(speed);

    this.setMovementBounds();
  }

  // 이동 제한 범위 설정
  private setMovementBounds() {
    const padding = 10;
    const ironmanWidth = this.ironman!.displayWidth;
    const ironmanHeight = this.ironman!.displayHeight;

    // 위치값 가져오기
    const posX =
      this.ironman.x +
      (this.ironman.body!.velocity.x * this.scene.game.loop.delta) / 1000;
    const posY =
      this.ironman.y +
      (this.ironman.body!.velocity.y * this.scene.game.loop.delta) / 1000;

    // 좌우 경계 확인 및 조정
    if (posX < padding + ironmanWidth / 2)
      this.ironman!.setX(padding + ironmanWidth / 2);
    if (posX > this.scene.game.canvas.width - padding - ironmanWidth / 2)
      this.ironman!.setX(
        this.scene.game.canvas.width - padding - ironmanWidth / 2
      );
    if (posY < padding + ironmanHeight / 2)
      this.ironman!.setY(padding + ironmanHeight / 2);
    if (posY > this.scene.game.canvas.height - padding - ironmanHeight / 2)
      this.ironman!.setY(
        this.scene.game.canvas.height - padding - ironmanHeight / 2
      );
  }

  // 아이언맨 리펄서 공격
  public attackRepulsor() {
    if (this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE)) return;

    // 아이언맨 리펄서 모드 전환
    this.ironmanManager.transform(IronmanMode.REPULSOR);

    // 리펄서 발사
    this.repulsorManager.fire();
  }

  // 아이언맨 빔 공격
  public async attackBeam() {
    if (
      this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE) ||
      this.stateManager.getCount(StateName.CURRENT_GAUGE_COUNT) <
        maxConfig.gauge
    )
      return;

    this.stateManager.updateState(StateName.IS_BEAM_MODE_ACTIVE, true);

    // 아이언맨 준비 모드 전환
    await new Promise<void>((resolve) => {
      this.ironmanManager.transform(IronmanMode.GATHER, () => {
        // 빔 발사
        this.beamManager.fire();
        resolve();
      });
    });

    // 아이언맨 빔 모드 전환
    await new Promise<void>((resolve) => {
      this.ironmanManager.transform(IronmanMode.BEAM, () => {
        // 빔 제거
        this.beamManager.destroy();
        resolve();
      });
    });
  }
}
