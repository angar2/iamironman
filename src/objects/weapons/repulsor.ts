import Phaser from 'phaser';
import { damageConfig, scaleConfig, speedConfig } from '../../config';
import { WeaponType } from '../../enum';

export default class Repulsor extends Phaser.Physics.Arcade.Image {
  private speed: number;
  private _type: WeaponType;
  private damage: number;
  private initialPosition: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = WeaponType.REPULSOR;
    this._type = WeaponType.REPULSOR;
    this.speed = speedConfig.repulsor;
    this.damage = damageConfig.repulsor;
    this.initialPosition = new Phaser.Math.Vector2(x, y);

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.repulsor) / this.width;
    this.setScale(scale);
  }

  public getType() {
    return this._type;
  }

  public getDamage() {
    return this.damage;
  }

  public getSpeed() {
    return this.speed;
  }

  public getInitialPos() {
    return this.initialPosition;
  }
}
