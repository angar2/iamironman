import Phaser from 'phaser';
import StateManager from '../managers/stateManager';
import UltronRepulsor from '../objects/weapons/ultronRepulsor';
import Ironman from '../objects/charaters/ironman';
import Enemy from '../objects/charaters/enemy';
import Repulsor from '../objects/weapons/repulsor';
import Beam from '../objects/weapons/beam';
import { HandlerName, StateName } from '../enum';
import Group from '../objects/group';

export default class CollisionHandler {
  private scene: Phaser.Scene;
  private stateManager: StateManager;

  private hitFromEnemiesOverlapHandler: Phaser.Physics.Arcade.Collider | null =
    null;
  private hitFromUltronRepulsorOverlapHandler: Phaser.Physics.Arcade.Collider | null =
    null;
  private attackOverlapHandler: Phaser.Physics.Arcade.Collider | null = null;
  private ultron1OverlapHandler: Phaser.Physics.Arcade.Collider | null = null;

  constructor(scene: Phaser.Scene, stateManager: StateManager) {
    this.scene = scene;
    this.stateManager = stateManager;
  }

  // 충돌 감지 핸들러 제거
  public removeOverlapHandler(
    handlerName: HandlerName,
    handler: Phaser.Physics.Arcade.Collider
  ) {
    if (!handler) return;
    handler.destroy();
    this[handlerName] = null;
  }

  // 아이언맨 피격 감지 핸들러 등록
  public handleHit(
    ironman: Phaser.Physics.Arcade.Group,
    targets: {
      enemies?: Group;
      ultronRepulsors?: Group;
    },
    callback: (ironman: Phaser.Physics.Arcade.Image, enemy: Enemy | UltronRepulsor) => void
  ) {
    const targetEntries = [
      {
        group: targets.enemies, // 빌런
        handlerName: HandlerName.HIT_ENEMIES,
        handlerProperty: HandlerName.HIT_ENEMIES,
      },
      {
        group: targets.ultronRepulsors, // 울트론 리펄서
        handlerName: HandlerName.HIT_ULTRON_REPULSOR,
        handlerProperty: HandlerName.HIT_ULTRON_REPULSOR,
      },
    ];

    targetEntries.forEach(({ group, handlerName, handlerProperty }) => {
      // 기존 핸들러 제거
      const handler = this.getOverlapHandler(handlerName);
      if (handler) {
        this.removeOverlapHandler(handlerName, handler);
      }

      // 피격 감지 등록
      if (group) {
        this[handlerProperty] = this.scene.physics.add.overlap(
          ironman!,
          group,
          (obj1, obj2) => {
            const ironman = obj1 as Ironman;
            const enemy = obj2 as Enemy | UltronRepulsor;

            callback(ironman, enemy); // () => 아이언맨 모드 변환/체력 감소
          },
          () => {
            const isInvincible = this.stateManager.getState(
              StateName.IS_INVINCIBLE
            );
            const isBeamModeActive = this.stateManager.getState(
              StateName.IS_BEAM_MODE_ACTIVE
            );
            return ironman && group && !isInvincible && !isBeamModeActive;
          },
          this
        );
      }
    });
  }

  // 아이언맨 공격 감지 핸들러
  public handleAttack(
    enemies: Phaser.Physics.Arcade.Group,
    weapons: Phaser.Physics.Arcade.Group,
    callback1: (enemy: Enemy, weapon: Repulsor | Beam) => void,
    callback2: (weapon: Repulsor | Beam) => void
  ) {
    // 기존 핸들러 제거
    const handler = this.getOverlapHandler(HandlerName.ATTACK);
    if (handler) this.removeOverlapHandler(HandlerName.ATTACK, handler);

    // 피격 감지 등록
    this.attackOverlapHandler = this.scene.physics.add.overlap(
      enemies!,
      weapons!,
      (obj1, obj2) => {
        const enemy = obj1 as Enemy;
        const weapon = obj2 as Repulsor | Beam;

        callback1(enemy, weapon); // () => enemy 사후 처리
        callback2(weapon); // () => weapon 사후 처리
      },
      undefined,
      this
    );
  }

  // 아이언맨-울트론1 충돌 감지 핸들러
  public handleIronmanUltron1Collision(
    ironman: Ironman,
    ultron1: Enemy,
    callback: () => void
  ) {
    // 기존 핸들러 제거
    const handler = this.getOverlapHandler(HandlerName.ULTRON1);
    if (handler) this.removeOverlapHandler(HandlerName.ULTRON1, handler);

    // 피격 감지 등록
    this.ultron1OverlapHandler = this.scene.physics.add.overlap(
      ironman,
      ultron1,
      () => {
        callback(); // () => 울트론1 모드 변환
      },
      undefined,
      this
    );
  }

  // 아이언맨 피격 감지 핸들러 가져오기
  public getOverlapHandler(handler: HandlerName) {
    switch (handler) {
      case HandlerName.HIT_ENEMIES:
        return this.hitFromEnemiesOverlapHandler;
      case HandlerName.HIT_ULTRON_REPULSOR:
        return this.hitFromUltronRepulsorOverlapHandler;
      case HandlerName.ATTACK:
        return this.attackOverlapHandler;
      case HandlerName.ULTRON1:
        return this.ultron1OverlapHandler;
      default:
        return null;
    }
  }
}
