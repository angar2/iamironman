import Phaser from 'phaser';
import { WeaponType } from '../../enum';
import { damageConfig, scaleConfig } from '../../config';

export default class Beam extends Phaser.Physics.Arcade.Sprite {
  private _type: WeaponType;
  private damage: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // 설정
    this.name = WeaponType.BEAM;
    this._type = WeaponType.BEAM;
    this.damage = damageConfig.beam;

    // sprite 추가
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const scale = (scene.game.canvas.width * scaleConfig.beam) / this.width;
    this.setScale(scale);
    this.setDepth(9);
  }

  public getType() {
    return this._type;
  }

  public getDamage() {
    return this.damage;
  }
}
