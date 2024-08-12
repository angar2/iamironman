import Phaser from 'phaser';

export default class CollisionZoneGroup extends Phaser.Physics.Arcade.Group {
  constructor(
    scene: Phaser.Scene,
    config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig
  ) {
    super(scene.physics.world, scene, config);

    // 설정
    this.name = 'collisionZones';
  }
}
