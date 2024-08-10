import Phaser from 'phaser';
import StateManager from '../managers/stateManager';
import TimerHandler from './timerHandler';
import GroupManager from '../managers/groupManager';
import IronmanManager from '../managers/charaters/ironmanManager';
import HealthManager from '../managers/displays/healthManager';
import EnemyManager from '../managers/charaters/enemyManager';
import Enemy from '../objects/charaters/enemy';
import Repulsor from '../objects/weapons/repulsor';
import Beam from '../objects/weapons/beam';
import UltronRepulsor from '../objects/weapons/ultronRepulsor';
import {
  CollisionZonesGroupType,
  EnemyMode,
  EnemyType,
  EnemyWeaponType,
  HeroType,
  IronmanMode,
  StateName,
  WeaponType,
} from '../enum';

type CollisionZonesGroupMap = {
  [key in
    | HeroType
    | EnemyType
    | WeaponType
    | EnemyWeaponType]: CollisionZonesGroupType;
};

export default class CollisionHandler {
  private scene: Phaser.Scene;
  private stateManager: StateManager;
  private timerHandler: TimerHandler;
  private groupManager: GroupManager;
  private ironmanManager: IronmanManager;
  private healthManager: HealthManager;
  private enemyManager: EnemyManager;
  private collisionZonesMap: CollisionZonesGroupMap = {
    [HeroType.IRONMAN]: CollisionZonesGroupType.IRONMAN,
    [EnemyType.ULTRON1]: CollisionZonesGroupType.ULTRON1,
    [EnemyType.ULTRON2]: CollisionZonesGroupType.ULTRON2,
    [EnemyType.ULTRON3]: CollisionZonesGroupType.ULTRON3,
    [EnemyType.ROCK]: CollisionZonesGroupType.ROCK,
    [WeaponType.REPULSOR]: CollisionZonesGroupType.REPULSOR,
    [WeaponType.BEAM]: CollisionZonesGroupType.BEAM,
    [EnemyWeaponType.ULTRON_REPULSOR]: CollisionZonesGroupType.ULTRON_REPULSOR,
  };

  constructor(
    scene: Phaser.Scene,
    stateManager: StateManager,
    timerHandler: TimerHandler,
    groupManager: GroupManager,
    ironmanManager: IronmanManager,
    healthManager: HealthManager,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.stateManager = stateManager;
    this.timerHandler = timerHandler;
    this.groupManager = groupManager;
    this.ironmanManager = ironmanManager;
    this.healthManager = healthManager;
    this.enemyManager = enemyManager;

    // this.createHandlers();
  }

  // 충돌 감지 핸들러 등록
  public createHandlers() {
    this.handleHit();
    this.handleAttack();
    this.handleUltron1Transform();

    setTimeout(
      () =>
        console.log(
          `Active colliders: ${this.scene.physics.world.colliders.length}`
        ),
      100
    );
  }

  // 아이언맨 피격 감지 핸들러
  public handleHit() {
    const targetTypes = {
      ...EnemyType,
      ...EnemyWeaponType,
    };

    for (const type of Object.values(targetTypes)) {
      this.scene.physics.add.collider(
        this.groupManager.getCollisionZones(
          this.collisionZonesMap[HeroType.IRONMAN]
        ),
        this.groupManager.getCollisionZones(this.collisionZonesMap[type]),
        () => {
          const target = this.groupManager
            .getCollisionZones(this.collisionZonesMap[type])
            .getCollisionParent() as Enemy | UltronRepulsor;

          // 아이언맨 모드 변환
          this.ironmanManager.transform(IronmanMode.HIT);

          // 아이언맨 데미지 처리
          this.healthManager.decrease();

          // 울트론 리펄서일 경우 제거
          if (target instanceof UltronRepulsor) {
            target.collisionZones.clear(true, true);
            target.destroy();
          }
        },
        () =>
          !this.stateManager.getState(StateName.IS_INVINCIBLE) &&
          !this.stateManager.getState(StateName.IS_BEAM_MODE_ACTIVE),
        this
      );
    }
  }

  // 아이언맨 공격 감지 핸들러
  public handleAttack() {
    for (const type1 of Object.values(EnemyType)) {
      for (const type2 of Object.values(WeaponType)) {
        this.scene.physics.add.collider(
          this.groupManager.getCollisionZones(this.collisionZonesMap[type1]),
          this.groupManager.getCollisionZones(this.collisionZonesMap[type2]),
          () => {
            const target1 = this.groupManager
              .getCollisionZones(this.collisionZonesMap[type1])
              .getCollisionParent() as Enemy;

            const target2 = this.groupManager
              .getCollisionZones(this.collisionZonesMap[type2])
              .getCollisionParent() as Repulsor | Beam;

            // 빌런 데미지 처리
            this.enemyManager.damage(target1, target2);

            // 울트론 리펄서일 경우 제거
            if (target2 instanceof Repulsor) {
              target2.collisionZones.clear(true, true);
              target2.destroy();
            }
          },
          undefined,
          this
        );
      }
    }
  }

  // 아이언맨-울트론1 충돌 감지 핸들러
  public handleUltron1Transform() {
    this.scene.physics.add.collider(
      this.groupManager.getCollisionZones(
        this.collisionZonesMap[HeroType.IRONMAN]
      ),
      this.groupManager.getCollisionZones(
        this.collisionZonesMap[EnemyType.ULTRON1]
      ),
      () => {
        const target = this.groupManager
          .getCollisionZones(this.collisionZonesMap[EnemyType.ULTRON1])
          .getCollisionParent() as Enemy;

        this.enemyManager.setTexture(target, EnemyMode.ATTACK);

        this.timerHandler.handleultronMode(() => {
          if (target && target.active)
            this.enemyManager.setTexture(target, EnemyMode.NORMAL);
        });
      },
      undefined,
      this
    );
  }
}
