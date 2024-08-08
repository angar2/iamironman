import Phaser from 'phaser';

export default class CollisionZone extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = 'collisionZone';

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
