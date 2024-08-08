import Phaser from 'phaser';
import { healthConfig, scaleConfig, speedConfig } from '../../config';

export default class Ironman extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private health: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = 'ironman';
    this.speed = speedConfig.ironman;
    this.health = healthConfig.ironman;

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale =
      (scene.game.canvas.height * scaleConfig.ironman) / this.height;
    this.setScale(scale);
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getHealth() {
    return this.health;
  }
}
