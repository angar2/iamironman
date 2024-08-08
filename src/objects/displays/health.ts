import Phaser from 'phaser';
import { scaleConfig } from '../../config';

export default class Health extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = 'health';
    this.setDepth(10);

    // sprite 추가
    scene.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.health) / this.width;
    this.setScale(scale);
  }
}
