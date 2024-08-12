import Phaser from 'phaser';
import Enemy from '../objects/charaters/enemy';
import Repulsor from '../objects/weapons/repulsor';
import Beam from '../objects/weapons/beam';
import UltronRepulsor from '../objects/weapons/ultronRepulsor';
import Ironman from '../objects/charaters/ironman';

export default class CollisionHandler {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // 아이언맨 피격 감지 핸들러
  public handleHit(
    ironman: Ironman,
    enemy: Enemy | UltronRepulsor,
    callback1: () => void,
    callback2: () => void
  ) {
    const colliderHandler = this.scene.physics.add.collider(
      ironman.collisionZones,
      enemy.collisionZones,
      () => callback1(),
      () => callback2(),
      this
    );
    enemy.colliderHandlers.push(colliderHandler);
  }

  // // 아이언맨 공격 감지 핸들러
  public handleAttack(
    weapon: Repulsor | Beam,
    enemies: Enemy[],
    callback: (enemy: Enemy, weapon: Repulsor | Beam) => void
  ) {
    for (const enemy of enemies) {
      let colliderHandler: Phaser.Physics.Arcade.Collider | null =
        this.scene.physics.add.collider(
          weapon.collisionZones,
          enemy.collisionZones,
          () => callback(enemy, weapon),
          undefined,
          this
        );
      weapon.colliderHandlers.push(colliderHandler);
    }
  }

  // 아이언맨-울트론1 충돌 감지 핸들러
  public handleUltron1Transform(
    ironman: Ironman,
    enemy: Enemy,
    callback: (enemy: Enemy) => void
  ) {
    const colliderHandler = this.scene.physics.add.collider(
      ironman.collisionZones,
      enemy.collisionZones,
      () => callback(enemy),
      undefined,
      this
    );
    enemy.colliderHandlers.push(colliderHandler);
  }
}
