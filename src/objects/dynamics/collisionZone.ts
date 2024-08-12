import Phaser from 'phaser';

export default class CollisionZone extends Phaser.GameObjects.Zone {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);

    // 설정
    this.name = 'collisionZone';
  }
}
