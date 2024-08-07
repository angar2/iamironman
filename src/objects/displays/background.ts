import Phaser from 'phaser';
import { scaleConfig } from '../../config';

export default class Background extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = 'background';

    // sprite 추가
    scene.add.existing(this);

    const scale =
      (scene.game.canvas.width * scaleConfig.background) / this.width;

    this.setScale(scale);
  }
}
